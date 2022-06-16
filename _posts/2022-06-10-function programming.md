---
title: "프로그래밍 페러다임과 함수형 프로그래밍"
categories:
  -  Java
tags:
  -  Java
---
Goal
* 프로그래밍 패러다임과 함수형 프로그래밍에 대해서 알아본다.
* 람다식에 대해서 알아본다.
* 메서드 참조에 대해서 알아본다.

<h3>프로그래밍 패러다임이란?</h3>

말 그대로 프로그래밍의 패러다임(어떠한 시대의 사람들의 견해나 사고)인데 프로그래머에게 프로그래밍의 관점을 갖게 해 주고, 결정하는 역할을 한다.

<h4> 종류 </h4>
명령형 프로그래밍 : 무엇(What)을 할 것인지 나타내기보다 어떻게(How) 할 건지를 설명하는 방식

* 절차적 프로그래밍(PP) : 데이터에 대한 순서를 파악하고 필요한 기능을 함수로 만들어 절차적으로 진행
* 객체 지향 프로그래밍(OOP) : 기능들을 묶어 하나의 객체로 만들어 객체의 메서드나 필드를 호출하면서 서로 간의 상호작용을 통해 알고리즘을 구성하는 방식

선언형 프로그래밍 : 어떻게 할 건지(How)를 나타내기보다 무엇(What)을 할 건지를 설명하는 방식

* 함수형 프로그래밍(FP) : 주어진 문제를 작은 문제로 나눈 뒤, 작은 문제를 해결할 수 있는 '순수 함수'를 사용하는 방식

여기까지만 보면 함수형 프로그래밍이 이해가 안 간다. 그래서 특징을 더 보겠다.

<h3>함수형 프로그래밍 특징</h3>

부수 효과(side effect)가 없는 순수 함수를 1급 객체로 간주하여 파라미터나 반환값으로 사용할 수 있으며, 참조 투명성을 지킬 수 있다

side effect : 다음과 같은 변화 또는 변화가 발생하는 작업을 의미한다.

* 변수의 값이 변경됨
* 자료 구조를 제자리에서 수정함
* 객체의 필드값을 설정함
* 예외나 오류가 발생하며 실행이 중단됨
* 콘솔 또는 파일 I/O가 발생함

그리고 이러한 부수 효과(Side Effect)들을 제거한 함수들을 순수 함수(Pure Function)이라고 부른다.

자바스크립트로 이를 예시를 들자면 
```javascript
//순수함수
function func(a, b) {
  return a + b;
}

console.log(func(2, 2)); // 4
//비순수함수 외부값인 c에 영향을 받기 때문
let c = 1;

function func(a, b) {
  return a + b + c;
}

console.log(func(2, 2)); // 5
```
이처럼 말이다.

자바에서 예시를 보고 싶었지만 지금은 이론적인 부분에서 이해하자 싶어서 더 이해하기 쉬운 자바스크립트를 활용하였다. 하지만 아래에는 자바에서는 어떻게 지원하는지 쓸 예정이다.

<h4>1급 객체(First-Class Object)</h4>

1급 객체란 다음과 같은 것들이 가능한 객체를 의미한다.

* 변수나 데이터 구조 안에 담을 수 있다.
* 파라미터로 전달할 수 있다.
* 반환값으로 사용할 수 있다.
* 할당에 사용된 이름과 무관하게 고유한 구별이 가능하다.

함수를 1급 객체로 여겨 다음과 같이 일반적인 객체가 가능한 것을 함수도 가능하게 여기는 것

<h4>참조 투명성(Referential Transparency)</h4>

참조 투명성(Referential Transparency)이란 다음과 같다.

* 동일한 인자에 대해 항상 동일한 결과를 반환해야 한다.
* 참조 투명성을 통해 기존의 값은 변경되지 않고 유지된다.(Immutable Data)

동일한 인자에 대해 항상 동일한 결과를 반환한다는 것은 결과를 프로그램의 동작과 결과를 예측하는데 용이하다는 것이다.

자 그럼 자바에서는 일급 객체를 어떻게 지원할까?

자바는 기본적으로 이런 함수형 프로그래밍을 지원할 만한 기능이 없었고 조금 반 배워도 이런 코딩은 불가능하다고 생각한다.

하지만 JDK8 이후부터 함수형 인터페이스, 람다, Stream API 등 함수형 프로그래밍을 지원할 만한 api가 추가되었다.

<h4>람다식</h4>

람다식은 함수를 하나의 식으로 표현하는 것이다. 이는 메서드의 이름이 필요하지 않아 익명 함수의 한 종류로 볼 수 있다.

사용법은 다음과 같다.
```java
(매개변수)->{리턴 혹은 실행문}
```
자바스크립트는 람다식으로 변수에 담아도 1급 객체라는 특성 덕에 바로바로 변수로 할당된다.

또한 자바스크립트는 동적 언어라 형 지정이 자유롭다. 이러한 이유 덕분에도 람다 함수의 변수 할당이 더 자유롭다.

하지만 자바는 정적 언어이다. 그러기에 타입의 명시를 해줘야 한다.

그래서 람다는 함수형 인터페이스라는 것을 리턴한다.

<h4>함수형 인터페이스</h4>

함수형 인터페이스는 위에서도 언급했지만 자바가 함수형 프로그래밍을 지원하기 위해 만든 인터페이스다.

정확히는 함수를 1급 객체처럼 다룰 수 있게 해주는 어노테이션으로 인터페이스에 선언하여 단 하나의 추상 메서드만을 갖도록 제한하는 역할

예시
다음은 최솟값을 구하는 출력하는 함수인데 이를 람다와 람다를 적용 안 한 것을 사용해 봤다.
```java
public interface NotLamda {//함수형 인터페이스 적용안한것
    int min(int a, int b);
}
public class Lamda {
    public static void main(String[] args) {
        MyLamda myLamda = (int a,int b)-> a<b ? a:b;
        System.out.println(new NotLamda() {
            public int min(int a, int b) {
                return a < b ? a : b;
            }
        }.min(3, 5));//3
    }
    
}

@FunctionalInterface
public interface MyLamda {//함수형 인터페이스 적용
    int min(int a, int b);
}
public class Lamda {
    public static void main(String[] args) {
        MyLamda myLamda = (int a,int b)-> a<b ? a:b;
        System.out.println(myLamda.min(3,5));//3
    }
    
}
```
람다를 적용한 것으로 코드가 간결해지고 가독성이 좋아진 것을 확인할 수 있다.

그렇다면 람다를 사용할 때마다 이렇게 계속 인터페이스를 만들어야 할까?

그래서 자바는 자주 사용될 것 같은 함수형 인터페이스가 이미 정의되어 있으며, 총 4가지 함수형 인터페이스를 지원하고 있다.

<h4> Supplier</h4>

Supplier는 매개변수 없이 반환값 만을 갖는 함수형 인터페이스이다.
Supplier는 T get()을 추상 메서드로 갖고 있다.

```java
@FunctionalInterface
public interface Supplier<T> {

    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
//사용 예시
Supplier<String> supplier = () -> "supplier";
        System.out.println(supplier.get());//supplier

```

<h4> Consumer </h4>

Consumer는 객체 T를 매개변수로 받아서 사용하며, 반환값은 없는 함수형 인터페이스이다. 
Consumer는 void accept(T t)를 추상메소드로 반환값이 void인것을 확인 가능
그런데 이상하게 함수가 하나 더있는데 함수형 인터페이스면 하나여야 되는거 아닌가 싶겠지만 추상메소드가 하나라는거지 default나 static메서드는 괜찮다.
(참고로 default나 static을 쓰면 인터페이스에서도 함수를 완성이 가능 [참고링크](https://programmers.co.kr/learn/courses/5/lessons/241))

여기서 andthen은 인자로 주어진 after로 그전 accept에 대해서 연쇄적으로 실행이 가능하게 해준다.
예시처럼 한 매개변수로 하나는 대문자로 하나는 소문자로 실행시켜주는 것이 확인 가능하다.
이는 andthen의 리턴문 때문인데 리턴문이 매개변수로 Consumer를 정의한 후 처음 적용하였던 accept와 after의 accept를 순서대로 실행해 주는 것을 확인해 줄 수 있다.

참고로 인자의 제네릭 정의 부분에 와일드카드는 T나 T의 조상을 받는다는 뜻이다.

Objects.requireNonNull은 null을 명시하고 장애가 발생한 시점을 빠르게 파악하기 위해 사용한다.
[Objects.requireNonNull](https://velog.io/@rockpago/Objects.requireNonNull)
[andthen의 매개변수 와일드카드](http://www.tcpschool.com/java/java_generic_various)


```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}

//예시
Consumer<String> consumer = (str) -> System.out.println(str.toUpperCase());
        Consumer<String> consumer2 = (str) -> System.out.println(str.toLowerCase());
        consumer.andThen(consumer2).accept("Hello World");
        //HELLO WORLD
        //hello world


```
<h4>Function</h4>

Function은 객체 T를 매개변수로 받아서 처리한 후 R로 반환하는 함수형 인터페이스다.
Function은 R apply(T t)를 추상 메서드로 갖는다.
Function 역시 andthen을 제공하며 기능은 같다.

그러나 compose라는 함수도 제공하는데 이는 리턴 타입을 apply의 매개변수로(즉 Function의 T) 하는 Function을 매개변수로 받는데 이를 before이라 하면 before.apply를 실행해 이것을 이후에 실행할 apply의 매개변수로 넣어서 실행한다.

아래 예시를 보면 compose에 있는 매개변수를 Function을 먼저 실행하고 이의 리턴 타입으로 apply를 실행하는 것을 확인할 수 있다.

또한 identity 함수가 존재하는데, 이는 자기 자신을 반환하는 static 함수이다.

```java
@FunctionalInterface
public interface Function<T, R> {

    
    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

  
    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
//예시
Function<String,Integer> function = (str) -> {System.out.println(str.length());
            return str.length();};
        Function<String,String> function2 = (str) -> {System.out.println(str+str);
            return str+str;};
        function.compose(function2).apply("hello");
         //hellohello
        //10
```

<h4> Predicate </h4>

Predicate는 객체 T를 매개 변수로 받아 처리한 후 Boolean을 반환한다.
Predicate는 Boolean test(T t)을 추상 메서드로 갖고 있다.

and : 두 Predicate에 test에 대하여 and 연산

or : 두 Predicate에 test에 대하여 or 연산

isEqual : object가 T와 같은지 확인

negate : test의 !연산 실행

```java
@FunctionalInterface
public interface Predicate<T> {

    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
    
}
 //predicate
        Predicate<String> predicate = (str) -> str.equals("Hello World");
        System.out.println(predicate.test("Hello World"));//true

```
<h3>메서드 참조</h3>

메서드 참조란 함수형 인터페이스를 람다식이 아닌 일반 메서드를 참조시켜 선언하는 방법이다.

TcpSchool에서는 다음과 같이 설명한다.

단 하나의 메서드만을 호출하는 경우에 해당 람다 표현식에서 불필요한 매개변수를 제거하고 사용할 수 있도록 해줍니다.

메서드 참조는 일반적으로 다음의 3가지 조건을 만족하면 사용이 가능하다.

* 함수형 인터페이스의 매개변수 타입 = 메서드의 매개변수 타입
* 함수형 인터페이스의 매개변수 개수 = 메서드의 매개변수 개수
* 함수형 인터페이스의 반환형 = 메서드의 반환형

참조 가능한 메서드로 일반 메서드, Static 메서드, 생성자가 있으며 클래스 이름::메서드 이름()으로 참조가 가능하다. 이렇게 참조를 하면 함수형 인터페이스를 반환한다.

다음은 일반 메서드 참조다.

```java
        //일반 메소드 참조
        // 메소드 참조로 변경
        Function<String, Integer> function3 = String::length;
        System.out.println(function3.apply("Hello World"));//11
```
이 코드를 처음엔 의아했다 왜냐하면 내가 이해한 대로라면 함수형 인터페이스의 매개변수는 String으로 length는 매개변수가 없으니 안되지 않나?

사실 위에 3가지는 쉽게 사용하기 위해 내가 참고한 무조건 되는 경우다.

oracle docs에서는 다음과 같이 매개변수의 함수를 사용하는 경우에도 가능하다고 정의하고 있다.

Reference to an Instance Method of an Arbitrary Object of a Particular Type

정확히는 매개변수의 함수라기보단 특정 타입의 임의 객체 instance에 대한 메서드 참조라고 보는 게 더 맞다.

갑자기 뜬금없이 인스턴스가 왜 나오나 싶을 거다.

자바는 인스턴스의 메서드 참조가 가능하다.

예시를 보겠다.

```java
  //instance 메소드 참조 
 // 일반 메소드를 참조하여 Consumer를 선언한다.
        Consumer<String> consumer3 = System.out::println;
        consumer3.accept("Hello World!!");//Hello World출력
```
System.out에 out 같은 경우 PrintStream이라는 인스턴스다. 고로 이것은 인스턴스의 메서드 참조라는 것을 알 수 있다.

또한 System.out.println 같은 경우 리턴 타입이 void고 매개변수로 String 받기에 다음과 같이 Consumer에 참조가 가능하다는 것 또한 알 수 있다.

자 우리는 인스턴스 참조가 가능하다는 것을 확인했다.

사실은 일반 메서드 참조는 애초에 인스턴스 메서드 참조가 일어나는 것이다. 이것이 당연한 게 일반 메서드는 애초에 인스턴스가 있지 않은 이상 사용을 못 한다.

그렇다면 특정 타입의 임의 객체 instance에 대한 메서드 참조 란 뭘까?

[참고 링크](https://stackoverflow.com/questions/66930573/method-reference-for-static-and-instance-methods)

해당 링크에 채택된 답변에서는 함수형 인터페이스의 매개변수의 타입과 인스턴스의 타입이 동일할 때를 특정 타입의 임의 객체 instance에 대한 메서드 참조로 보고 있다.

이때는 instance가 아닌 class::method 형태로 사용한다.

물론 리턴 타입도 함수형 인터페이스와 동일해야 사용이 가능하다.

즉 String은 Function의 매개변수 타입과 동일하고 length 함수 역시 Function의 리턴 타입과 동일하니 메서드 참조가 가능하다.

그러면 특정 타입의 임의 객체 instance에 대한 메서드 참조가 가능할 때 그냥 특정 인스턴스에 대한 참조도 가능할까?

다음 예시를 보겠다.

```java
//instance 메소드 참조
        String str2 = new String();
        Function<String, Integer> function4 = str2::length;
        System.out.println(function4.apply("Hello World"));
```
위의 코드는 실행이 불가능하다. 즉 두 경우는 아예 다른 걸로 본다.

특정 인스턴스에 대한 참조는 위에서 언급한 세 가지 조건을 따른다고 보면 된다.

생성자 참조

Supplier 같은 경우 매개변수는 없고 반환값만 갖는 함수형 인터페이스이므로 다음과 같이 Object는 생성자 참조가 가능하다.
```java
Supplier<Object> supplier2 = Object::new;
```

정리하면서

이와 같은 프로그래밍 패러다임은 어디까지나 패러다임일 뿐이지 프로그래밍 언어가 하나의 패러다임에 종속되어 있지 않다.

즉 객체 지향형 언어로 잘 알려진 자바도 함수형 프로그래밍과 절차적 프로그래밍이 가능하다.

애초에 객체 지향형 언어라는 게 틀린 말이라는 것 하지만 특정 언어가 해당 패러다임에 강한 이점은 가질 수 있는 것은 사실이다.



출처 : 

[https://st-lab.tistory.com/151 ](https://st-lab.tistory.com/151)

[https://boxfoxs.tistory.com/430](https://boxfoxs.tistory.com/430) 

[https://mangkyu.tistory.com/111](https://mangkyu.tistory.com/111)

[https://velog.io/@recordboy/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EC%88%9C%EC%88%98-%ED%95%A8%EC%88%98Pure-Function](https://velog.io/@recordboy/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EC%88%9C%EC%88%98-%ED%95%A8%EC%88%98Pure-Function)

[https://www.javainterviewpoint.com/java-method-reference/](https://www.javainterviewpoint.com/java-method-reference/)

[https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)