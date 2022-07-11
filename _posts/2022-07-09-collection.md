---
title: "Collection"
categories:
  -  Java
tags:
---


### Goal

* 컬렉션과 컬렉션의 종류에 대해서 알아본다.
* 컬렉션 관련 내용(비교,반복자)에 대해서 알아본다.



# 컬렉션이란?

자바에서 컬렉션이란 다수의 데이터를 쉽고 효과적으로 처리할 수 있는 표준화된 방법을 제공하는 클래스의 집합을 의미한다.

즉, 데이터를 저장하는 자료 구조와 데이터를 처리하는 알고리즘을 구조화하여 클래스로 구현해 놓은 것이다.



## 컬렉션 종류

대표적으로 3종류로 나뉜다.

1. List <E> : 순서가 있는 데이터의 집합으로, 데이터의 중복 허용

2. Set <E> : 순서가 없는 데이터의 집합으로, 데이터의 중복을 허용안함 

3. Map <K,V> : 키와 값의 한 쌍으로 이루어지는 데이터의 집합, 순서가 없음 키의 중복은 허용하지 않지만 값의 중복은 허용함

이와 같은 인터페이스의 구현체를 컬렉션 클래스라 한다.

List와 Set은 모두 Collection 인터페이스를 상속 받지만 구조상의 차이로 Map 인터페이스는 별도로 정의된다.

## Collection 인터페이스 

List와 Set의 많은 공통적인 부분을 Collection을 상속받았다. 그래서 Collection 인터페이스는 컬렉션을 다루는데 가장 기본적인 동작들이 정의되어 있다.

[제공함수 링크](http://www.tcpschool.com/java/java_collectionFramework_concept)

## Iterator 인터페이스

자바의 컬렉션 프레임워크는 컬렉션에 저장된 요소를 읽어오는 방법을 Iterator인터페이스로 표준화 하였다.

Collection 인터페이스는 Iterartor 인터페이스를 구현한 클래스의 인스턴스를 반환하는 메소드를 제공한다.

```java
LinkedList<Integer> lnkList = new LinkedList<Integer>();
        
        lnkList.add(12);

        lnkList.add(42);

        lnkList.add(33);

        lnkList.add(21);

        Iterator<Integer> iter = lnkList.iterator();

        while (iter.hasNext()) {
            System.out.print(iter.next() + " ");//12 42 33 21 
        }
```
다음과 같이 각요소에 내용을 읽어서 출력할수있다.

hasNext()는 해당 iteration이 다음요소를 가지고 있으면 true를 더 이상 다음 요소가 없으면 false를 반환 

next()는 다음 요소를 반환한다. 

자바에서 enhanced for문을 사용하는 것을 권장하고 있다. 같은 성능을 유지하면서도 명확성을 확보하기 때문이다. 하지만 요소의 선택적 제거나 대체 등을 수행하기 위한 iterator를 사용해야만 한다.

## Comparable 

Comparable

객체를 정렬하는데 사용되는 메소드 compareTo()메소드를 정의하고 있다.

Arrays.sort()를 사용해 함수 내부로 더 들어가면 compareTo 함수를 불러 반환값이 양수인지 음수인지 구분해 값을 바꿀지 말지 정한다.

List같은 경우 sort()를 하면 내부적으로 Arrays.Sort(물론 오버로딩된 다른 함수일 수도 있다 그래도 compareTo를 쓰는건 동일)를 부른다.

[Arrays.sort 내부](https://sabarada.tistory.com/138)

```java
//list sort
default void sort(Comparator<? super E> c) {
        Object[] a = this.toArray();
        Arrays.sort(a, (Comparator) c);
        ListIterator<E> i = this.listIterator();
        for (Object e : a) {
            i.next();
            i.set((E) e);
        }
    }
```

다음은 Comparable을 활용해 정렬을 한 사례다.

```java
class Node implements Comparable<Node>{
    public int value;

    public Node(int value) {
        this.value = value;
    }

    @Override
    public int compareTo(Node o) {
        return this.value - o.value;
    }
}
public class CompareStudy {
    public static void main(String[] args) {
        List<Node> list = new ArrayList<>();
        for(int i=5;i>0;i--){
            list.add(new Node(i));
        }
        list.stream().forEach(node -> System.out.print(node.value));//54321

        System.out.println();

        list.sort(Comparator.naturalOrder());

        list.stream().forEach(node -> System.out.print(node.value));//12345
    }

}
```

다음과 같이 정렬된것을 확인할수있다. 

바꾸는 기준은 오름차순을 할경우 this의 값이 클경우 양수를 반환하면 된다.

그래서 나는 오름차순 정렬을 위해 this.value - o.value로 해주었다.

물론 반대로 한다면 내림차순이 된다.

이와 비슷하게 Comparator라는 것도 존재한다. 

이것은 코드로 설명하겠다.

```java
class Node2 {
    public int value;

    public Node2(int value) {
        this.value = value;
    }

}

 //Comparator

        List<Node2> list2 = new ArrayList<>();

        for(int i=5;i>0;i--){
            list2.add(new Node2(i));
        }

        Comparator<Node2> comp = new Comparator<Node2>() {
            @Override
            public int compare(Node2 o1, Node2 o2) {
                return o1.value-o2.value;
            }
        };

        list2.stream().forEach(node -> System.out.print(node.value));//54321

        System.out.println();

        list2.sort(comp);

        list2.stream().forEach(node -> System.out.print(node.value));//12345
```

Comparator 역시 comparable과 비슷하게 사용이 된다. 제공 함수로는 compare을 쓴다는것과 비교할때 자기 자신을 쓰지 않고 두 변수로 받아써 지금 코드처럼 익명함수의 사용이 가능하다.

Comparator는 조금 특별한 정렬을 원할때 많이 쓰인다.

[내용참고](https://st-lab.tistory.com/243)