---
title: "eqauls와 hashCode 정리"
categories:
  -  CS
tags:
  - Network
---


### Goal
 * equals()와 hashCode()에 대해서 알아보자.


## equals()

equals()는 주로 값을 비교할때 사용하는데 만약 객체안에 값을 비교하고 싶은데 평소에 사용하는 비교연산자(==)를 사용하면 객체 안에 값이 같아도

false라고 한다. 이유는 ==연산자를 객체에 쓰면 참조형인 객체는 주소값을 비교하기 때문이다.

안에 값들을 비교하기 위해서는 다음처럼 equals()를 사용해야 된다.

```java
//equals 예시
        String sample1 = new String("1234");
        String sample2 = new String("1234");

        System.out.println(sample1==sample2);//false
        System.out.println(sample1.equals(sample2));//true
```

기본적으로 모든 Object들이 자바의 Object class를 상속받는데 Object class에는 equals()가 다음과 같이 정의되어 있다.

```java
public boolean equals(Object obj) {
        return (this == obj);
    }
```
이를 String에서는 다음처럼 정의 하였다.

```java

public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String aString = (String)anObject;
            if (!COMPACT_STRINGS || this.coder == aString.coder) {
                return StringLatin1.equals(value, aString.value);
            }
        }
        return false;
    }

```
이러한 이유 때문에 String.equals()를 통해 주소값을 비교하고 내부 값을 비교하여 같은지 여부를 알려준다.

만약 우리가 새로운 객체를 만들어서 Equals를 사용한다면 어떻게 될까?

```java
class SampleObject{
    private int a;
    SampleObject(int a){
        this.a = a;
    }
}

        SampleObject sampleObject1 = new SampleObject(4);
        SampleObject sampleObject2 = new SampleObject(4);
        System.out.println(sampleObject1.equals(sampleObject2));//false
```

당연히 equals()를 재정의 해주지 않았기 때문에 다음처럼 false가 뜬다.

다음처럼 재정의 해주면 정상적으로 비교를 해준다.

```java
class SampleObject{
  . . .
@Override
    public boolean equals(Object object){
        if(object == this) return true;

        if(object instanceof SampleObject){
            if(((SampleObject) object).a == this.a)
                return true;
            else
                return false;
        } else
            return false;
    }
  . . . 
}
```

## hashCode()

hashCode()는 객체를 식별하는 해싱된 하나의 정수값을 의미한다. 

근데 굳이 ==도 있는데 이걸 왜 쓸까?

이유는 HashMap과, HashSet과 같은 자료구조에 있다. 

Hashmap에 대한 자세한 설명은 다음에 map을 정리하면서 하겠다.

HashMap을 간단히 말하자면 중복되지 않는 키와 값의 쌍을 갖는 자료구조다.

근데 여기서 중복을 체크할때 hashCode와 equals()를 사용하는데. hashCode를 통해 먼저 비교후에 같으면

equals를 통해 같은지 확인한다. 문제는 자바에서 정의된 객체들은 대부분 잘 처리가 되지만 우리가 정하는

사용자 객체같은 경우는 처리가 불가하다. 다음 코드를 보겠다.

```java
//equals 예시
        String sample1 = new String("1234");
        String sample2 = new String("1234");

        System.out.println(sample1.hashCode()==sample2.hashCode());//true
```
다음 코드는 비록 객체는 다르지만 hashCode는 같다고 나오는걸 확인할 수 있다.

이유는 기본적인 Object의 hashCode()를 String에서 다음과 같이 재정의 해주었기 때문이다.

```java

public int hashCode() {
        int h = hash;
        if (h == 0 && !hashIsZero) {
            h = isLatin1() ? StringLatin1.hashCode(value)
                           : StringUTF16.hashCode(value);
            if (h == 0) {
                hashIsZero = true;
            } else {
                hash = h;
            }
        }
        return h;
    }
  

```

기존의 객체를 hashCode()를  다음과 같은 결과를 갖게 했다.

```java
class SampleObject{
  . . .
@Override
    public int hashCode(){
        return Objects.hashCode(this.a);
    }
    . . .
}

SampleObject sampleObject1 = new SampleObject(4);
SampleObject sampleObject2 = new SampleObject(4);

System.out.println(sampleObject1.hashCode()==sampleObject2.hashCode());//true

```

equals와 비슷하게 만약 해당 내용이 같다면 같은 hashCode가 나오게 했다.

HashMap에 대해서 제대로 정리하지 않았지만 다음과 같이 hashmap에 두개의 값을 넣었을때 같인 Key라고 인식하여 사이즈가 1인것을 확인할 수 있다.

```java
        HashMap<SampleObject,Integer> hashMap = new HashMap<>();
        hashMap.put(sampleObject1,1);
        hashMap.put(sampleObject2,1);
        System.out.println(hashMap.size());//1
```

 



참고 : 

[해시 코드 참고](https://jisooo.tistory.com/entry/java-hashcode%EC%99%80-equals-%EB%A9%94%EC%84%9C%EB%93%9C%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B3%A0-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C)

[해시 코드 참고2](https://tecoble.techcourse.co.kr/post/2020-07-29-equals-and-hashCode/)





