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

	

	

</beans>
```
위의 메타데이터 파일을 ioc 컨테이너 형성에 사용한다.



<h6>DI(Dependency Injection)</h6>
------
	
스프링에서 dependency Injection을 지원한다 그렇다면 이 dependency Injection이라는 뭘까 말의 뜻만 본다면 의존성 주입이다. 이것을 docs로 찾아보자 

스프링 docs에서는 다음과 같이 나왔다. “Dependency Injection(DI; 의존성 주입)은 오브젝트가 컨스트럭터 인수, 팩토리 메서드에 대한 인수 또는 팩토리 메서드에서 반환된 오브젝트인스턴스에 설정된 속성을 통해서만 의존성(즉, 작업하는 다른 오브젝트)을 정의하는 프로세스입니다.”

와 공부했었던 내용이지만 docs로봐선 이거 절대로 한번에 이해 못한다. 그러나 docs의말을 좀더 쉽게 말하자면 예시를 들어 설명하겠다.

```java
public class Program {
	
	private SongExam songExam;
	public Program() {
		songExam = new SongExam();
	}
}
```

이 코드는 SongExam 이라는 외부 객체를 사용한다. 다시 말해 SongExam이라는 외부객체에 의존한다해서 이를 의존성이 있다고 한다. 

근데 잘보면 SongExam 객체는 Program 객체에서 인스턴스화 하는것을 볼수있다. 우리는 이런것을 강하게 의존한다고 볼수있다.

그 이유는 SongExam 객체를 Program 객체가 알아야 하고 만약에 Program객체가 사라진다면 SongExam객체도 같이 사라지기때문
지금당장에 문제가 없어보여도 SongExam에서 우리가 더좋은코드가 있어 바꾸고싶다고해도 코드를 바꿔야한다는 수고를 들여야한다.

위 문제를 해결하기위해서는 일단 다형성을 넣어줘어야한다.

다음코드로 설명하겠다.

```java
public interface Exam {
	
}


public class SongExam implements Exam {
	

}

```

그 다음으로 강한 결합성을 해결하기 위해 다음코드와 같이 인터페이스로 받고 외부에서 의존성을 주입해줘야 된다.

```java

public class Program {
	
	private Exam exam;
	public Program(Exam exam) {
		this.exam = exam;
	}
}

```

그럼 스프링에서는 위의 코드를 활용해 다음과 같이 ioc컨테이너에서 의존성주입을 도와준다.

```java
public class Beanfactory(){

public void beanfactory() { 
		// Bean의 생성 
		SongExam songExam = new SongExam(); 
		// 의존성 주입 
		Program program = new Program(songExam); 
	}
}
```

위에 어렵게 말한 docs의 말도 이제 어느정도 감이 올것이다.

di를 정리하자면 의존성 주입을 외부에서 두 객체의 관계를 정의, 클래스 레벨에서는 의존관계가 고정되지 않도록 하고 런타임 시에 관계를 다이나믹하게 주입 하는 디자인패턴이라고 알면된다. 스프링은 이를 지원하는것일뿐이다.

출처: https://mangkyu.tistory.com/150 [MangKyu's Diary] 

자 그럼 스프링에서 di를 어떻게 써야하는지 코드를 통해 알아보자.

먼저 di가 필요한 상황을 가정하여 다음과 같은 객체들을 만들겠다.

시험의 성적의 합과 평균을 나타내는 인터페이스 Exam

Exam을 상속해 자세한 시험을 정의한 songExam

```java
public interface Exam {
	int total();//합계
	float avg();//평균
}


public class SongExam implements Exam {
	
	private int kor;//국어 점수
	private int eng;//영어 점수
	private int math;//수학 점수
	private int com;//컴퓨터 점수

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

두번째로 시험결과를 출력해줄 ExamConsole

ExamConsole을 상속해서 시험 결과를 inline으로 출력하는 InlineExamConsole

```java
public interface ExamConsole {
	
	void print();//성적 출력 

	void setExam(Exam exam);//시험 등록
	
}

public class InlineExamConsole implements ExamConsole {
	private Exam exam;
	public InlineExamConsole() {}
	public InlineExamConsole(Exam exam) {
		this.exam = exam;
	}

	@Override
	public void print() {
		System.out.printf("total is %d, avg if %f\n",exam.total(),exam.avg());
	}

	@Override
	public void setExam(Exam exam) {
		this.exam = exam;
		
	}

}
```

InlineExamConsole은 외부 객체인 Exam에 의존성을 보이고 있고 di의 필요성을 우리는 알수있다.

스프링을 통해 di를 하기위해 다음과 같이 main함수에 적겠다.

```java
public static void main(String[] args) {

		ApplicationContext context = new ClassPathXmlApplicationContext("spring/di/setting.xml");
		
	}
```
먼저 setting.xml이라는 configuration data를 통해 ioc 컨테이너를 형성한다. 이유는 위에서 말했듯이 스프링은 ioc컨테이너를 객체를 제어하기때문

그럼 어떻게 위의 객체들을 ioc컨테이너의 bean으로 만들까? 방법은 두가지가 있다. 어노테이션을 활용하는 방법과 xml이다.

일단 xml을 먼저보겠다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="exam" class="spring.di.entity.SongExam" >
	
	<property name="kor" value="20"></property>
	<property name="eng" value="20"></property>
	<property name="math" value="20"></property>
	<property name="com" value="20"></property>
	</bean>
	<bean id="console" class="spring.di.ui.InlineExamConsole">
	<property name="exam" ref="exam"/>
	</bean>
</beans>
```

왠지 보기만해도 뭔말인지 예상이 갈수있다. configuartion data에 다음과 같이 bean태그를 사용해 id 와 class를 정의해주면
id를 변수이름으로한 class 내용의 객체를 bean형태로 저장해준다.

property 태그를 활용해 해당 bean객체의 프로퍼티들을 정의할수있다.

 name으로 변수의 이름으로 해주면 변수 set 함수를 통해 알아서 value나 ref값을 주입을 해준다.
value는 기본적인 리터값을 ref는 다른 bean을 주입한다.

즉 id가 console인 bean은 프로퍼티인 exam은 ref를 통해 id가 exam인 bean을 di를 한다.

그럼 이렇게 di가 된다는것을 알았다면 이를 main함수에서 활용하기 위해 다음과 같이 코드를 작성하면된다.

```java

public static void main(String[] args) {
	
		ApplicationContext context = new ClassPathXmlApplicationContext("spring/di/setting.xml");
	
		ExamConsole console = context.getBean(ExamConsole.class);//ioc컨테이너에서 ExamConsole.class를 상속한 유사한 빈을 가져옴

		console.print(); //빈함수 출력
	}
```
주석 만으로도 이해가 갈거라 생각하지만 더 설명을 하자면 해당 ioc 컨테이너에서 getBean함수를 통해

bean을 객체형태로 반환해 그것을 이용한다.

annotation 활용은 낼 다시 ~~
이건 내일부터 ^^ aop까지 차근차근 크흠




<h6>AOP</h6>
------

내일 이어서 쓰겠음 

참고 : 
https://ko.wikipedia.org/wiki/Plain_Old_Java_Object

https://www.cisin.com/coffee-break/ko/technology/what-is-an-enterprise-software-and-how-does-its-development-differ-from-normal-software-development.html