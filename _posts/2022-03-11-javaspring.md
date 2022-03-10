---
title:  "Spring"
categories:
  -  Spring
tags:
  -  Java 
  -  Framework
---
스프링은 무엇이고 왜 쓰는가?
------

웹 백엔드라면 많이들어봤을 단어 스프링은 무엇일까?
스프링은 자바의 프레임워크로 POJO 기반의 엔터프라이즈 어플리케이션을 개발을 쉽고 편하게 돕는다.


POJO (plain old java Object) : 문자 그대로 오래된 방식의 간단한 자바 object이다. 프로젝트를 유지보수하는데 있어서 조금 수정할 것이 있는데 만약 단단히 결합되어있는 무거운 객체라면 수정이 쉽지않을것이다. 그래서 이것을 문제로 여겨 되도록 결합력이 약한 간단한 object를 사용하자라 해서 pojo라는 용어가 나온것


엔터프라이즈 어플리케이션 : 기업이 기업문제를 해결하는데 사용하는 크고 복잡한 소프트웨어 플랫폼 개별 사용자에게 초점을 맞추지 않고 회사 전체를 목표로 작업을 완료하고 인간의 노력과 노동을 줄입니다.  예로는 우리가 개발할 서버가 있겠다.

프레임워크 : 개발자의 편의를 위해 제공되는 api다. 제어의 주체가 프레임워크다. 개발자는 제어의 흐름에 맞게 코드를 작성하면 프레임워크에서 호출 

라이브러리 : 개발자의 편의를 위해 제공되는 api다. 제어의 주체가 개발자

즉 스프링은 pojo와 같은 간단한 object를 활용해 기업의 크고 복잡한 엔터프라이즈 어플리케이션을 더 쉽게 편하게 개발할수 있게 돕는 프레임워크이다.

우리가 백엔드 프레임워크로 사용하는 스프링은 spring-web을 사용하는것이며 이는 web을 pojo를 이용해 쉽게 구현할수있게 하는것이다.


스프링의 특징은 무엇일까?
------
1. IOC Container(inversion of control)
스프링에서 제일 중요한것으로 말의 의미는 제어의 역전 컨테이너다. 이는 스프링이라는 프레임워크에서 제어를 하는공간 이다. 객체의 생명주기 관리를 컨테이너에서 대신해주는것


2. DI(Dependency Injection)
	
3. AOP

내일 이어서 쓰겠음 

참고 : 
https://ko.wikipedia.org/wiki/Plain_Old_Java_Object

https://www.cisin.com/coffee-break/ko/technology/what-is-an-enterprise-software-and-how-does-its-development-differ-from-normal-software-development.html