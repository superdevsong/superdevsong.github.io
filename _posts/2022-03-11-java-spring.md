---
title: "Spring"
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

<h6>IOC Container(inversion of control)</h6>
------

스프링에서 제일 중요한것으로 말의 의미는 제어의 역전 컨테이너다. 이는 스프링이라는 프레임워크에서 제어를 하는공간 이다. 

객체의 생명주기 관리를 컨테이너에서 대신해주는것

좀 더 구체적으로 말하자면 스프링은 사용자가 생성하려는 object를 bean이라는 형태로 관리한다.  

bean이 필요한 시점에는 Dependency injection을 통해 객체를 주입한다. di는 아래에서 더 설명하겠다

Bean : 스프링 ioc 컨테이너에서 관리하는 객체를  bean 이라고함 그렇다면 ioc container는 어떻게 구현할까.

ApplicationContext 객체를 통해 구현할수있다. 

잠시 문서를 참고하겠다.  “BeanFactory 인터페이스는 모든 유형의 개체를 관리할 수 있는 고급 구성 메커니즘을 제공합니다. ApplicationContext는 BeanFactory의 하위 인터페이스입니다.” 

“Application context interface는 Spring IoC 컨테이너를 나타내며 빈의 인스턴스화, 구성 및 조립을 담당합니다.”
번역 - 파파고

즉 beanfactory라는 인터페이스로 ioc 컨테이너가 구현이되며 이를 바탕으로 만들어진 applicationcontext 객체는 더 엔터프라이즈한 기능을 제공한다. 

자 그럼 사용법을 설명하겠다 이 역시 파파고가 해석해준 문서본을 보겠다 (귀찮게 해석해서 글쓰는것보다 이게 더 빠르다
절대 해석 못하는거 아님 크흠 ^^)

"컨테이너는 구성 메타데이터를 읽음으로써 인스턴스화, 구성 및 조립할 개체에 대한 지침을 가져옵니다."


여기서 중요한것은  사용법이다. “메타데이터를 읽음으로써” configuration data !! 메타데이터를 통해 제공한다는것
메타데이터는 xml이나 어노테이션 자바코드를 통해 제공이 된다. 이제 우리는 사용법을 알았다.

Application context + meta data 이조합으로 ioc container가 구현이 가능하다. 자 그럼 구현하는 코드를 작성해보자
일단 xml을 configuration data 로사용하는 코드를 보겠다.
대략적으로 사용할코드들이다.


SongExam
```java
public class SongExam implements Exam {

	/*exam 인터페이스를 상속하는 클래스야

	 * 내용은 각 과목에대한 변수들 그리고 인터페이스에서 구현한

	 * 내용들을 여기서 다시 재구현 했어 어려운 내용은 없으니 이정도만 설명할게*/

	private int kor;

	private int eng;

	private int math;

	private int com;



	public int getKor() {

		return kor;

	}



	public void setKor(int kor) {

		this.kor = kor;

	}



	public int getEng() {

		return eng;

	}



	public void setEng(int eng) {

		this.eng = eng;

	}



	public int getMath() {

		return math;

	}



	public void setMath(int math) {

		this.math = math;

	}



	public int getCom() {

		return com;

	}



	public void setCom(int com) {

		this.com = com;

	}



	@Override

	public int total() {

		// TODO Auto-generated method stub

		return kor+eng+math+com;

	}



	@Override

	public float avg() {

		// TODO Auto-generated method stub

		return total()/4.0f;

	}



}

```
GridExamConsole
```java
public class GridExamConsole implements ExamConsole {

	Exam exam;

	public GridExamConsole() {

		// 여기가 비어있어서 당황스럽겠지만 최초에 내가 구현할때는 아래에있는 생성자로 구현해서 그래

	}

	public GridExamConsole(Exam exam) {

		//성적을 받는 부분이야

		super();

		this.exam = exam;

	}



	@Override

	public void print() {

		//성적출력

		System.out.println("┌─────────┬─────────┐");

		System.out.println("│  total  │   avg   │");

		System.out.println("├─────────┼─────────┤");

		 System.out.printf("│   %3d   │  %3.2f   │\n",exam.total(),exam.avg());

		System.out.println("└─────────┴─────────┘");



	}



	@Override

	public void setExam(Exam exam) {

		/*성적을 받는 dependency injection부분이야

		 * 위에꺼도 맞지만 스프링에서는 여기가 더 효율적이지*/

		this.exam = exam;



		

	}



}
```

여기서 부터 봐주기바람

Program
```java
public class Program {
	public static void main(String[] args) {
	
		ApplicationContext context =
				new ClassPathXmlApplicationContext("spring/di/setting.xml");//application context
        }

}
```
application context이 xml의 configuration data를 통해 ioc 컨테이너를 만드는 코드이다.
보기만 해도 이해가 될테지만 applicationcontext라는 인터페이스를 ClassPathXmlApplicationContext로 캐스팅해서 사용하는것을 알수있음

Setting.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"

	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="exam" class="spring.di.entity.SongExam" />

	<bean id="console" class="spring.di.ui.GridExamConsole">

	<property name="exam" ref="exam"/>

	</bean>

</beans>
```
이 설정파일을 통해 위에 코드의 객체를 bean형태로 등록한다 자세한 설명은 di를 통해 한번더 하겠다. 어쨌든 이 메타데이터 파일을 ioc 컨테이너 형성에 사용한다는 것을 알수있음



<h6>DI(Dependency Injection)</h6>
------
	
<h6>AOP</h6>
------

내일 이어서 쓰겠음 

참고 : 
https://ko.wikipedia.org/wiki/Plain_Old_Java_Object

https://www.cisin.com/coffee-break/ko/technology/what-is-an-enterprise-software-and-how-does-its-development-differ-from-normal-software-development.html