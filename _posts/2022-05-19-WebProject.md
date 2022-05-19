---
title: "간단한 과제 프로젝트"
categories:
  -  WebProject
tags:
  -  JavaScript
  -  Express
  -  Sequelize
---
이번엔 과제로 웹프로젝트를 시작하게 되었다.

팀은 이전 캡스톤 팀과 동일하다. 

이번 프로젝트는 간단한 sns service를 만드는것이고 나는 거기서 주로 백엔드 작업처리를 도맡아 하게되었다.

틀은 정해져있고 sequelize로 제공한 db model들도 있어서 과제는 db모델을 변경하거나 새로운 db 모델을 추가해서 sns기능을 더 추가하는것이다.

기본 제공 틀에서 제공하는 기능은 해시태그, 해시태그로 작성된 글 검색, 글 작성, 팔로우 기능이다.

우리가 추가할 기능은 좋아요 싫어요, 해당하는 날짜의 글을 검색하는 캘린더기능, 자신이 올린 게시글의 사진을 모아두는 사진첩기능, 게시글의 답글을 다는기능, 글의 공개 비공개이다. 

이중 나는 좋아요 싫어요, 답글기능 , 사진첩기능을 맡았다.

![screen1](../assets/images/Projectfolder.png)

사진은 프로젝트 구조다. 주요 폴더만 소개 하겠다. 


config는 sequelize를 사용할때 db설정내용들을 넣어뒀다.

models는 사용할 엔티티들을 정의해놓았다.

(passport는 내가 건들진 않아서 설명에서 생략)

routes는 서버에서 rest api를 활용할 컨트롤러들의 폴더이다.

views는 템플릿들이있다. 우리는 넌적스를 사용한다.

이제 내가 구현한 코드들을 보겠다.

일단 좋아요 싫어요이다.

좋아요 싫어요는 일단 새로운 db가 필요하여 model에 emotion.js파일을 만들었다.
```javascript

const Sequelize = require('sequelize');

module.exports = class Emotion extends Sequelize.Model {//감정표현 모델
  static init(sequelize) {
    return super.init({
        emotion: {//감정표현 상태
        type: Sequelize.STRING(140),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Emotion',
      tableName: 'emotions',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {//foreign key둘
    db.Emotion.belongsTo(db.Post);
    db.Emotion.belongsTo(db.User);
  }
};
```
자바스크립트에서 class형식은 잘안쓰는데 강의에서 듣는 내용은 class를 활용하고 이게 더 쉬워보여서 사용하였다.

init 함수를 재정의해준다. 테이블에 대한 설정을 해주는것이다.
대충봐도 짐작이 되겠지만 첫번째 중괄호에 프로퍼티를 두번째에서는 테이블 자체에 대한 설정을 해준다.

편한점은 timestamps: true로 해주면 create나 update날짜 프로퍼티를 만들고 심지어 알아서 갱신도 해준다. 이거jpa도 있나 확인해봐야겠다.

static associate는 관계설정이다. 이것으로 외래키나 단방향, 양방향, 1:1,1:n,n:m 관계를 정의해줄수있다.
수업에서는 양방향만 하길레 혹시나 해서 단방향으로 해봤는데 잘 작동하였다.

이번코드에서는 수업내용처럼 양방향으로 적용할것

belongSTo가 왜래키를 갖는쪽이다.(연관 관계의 주인)

```javascript
    db.Post.hasMany(db.Emotion);
    db.Post.hasMany(db.Comment);
```
참고로 양방향 정의할때는 연관관계 주인이 아닌쪽은 이렇게 has메서드를 쓴다 지금은 다대일이라 hasmany를 쓴것

그 다음은 models폴더에서 index.js에서 직접적인 db연결을 해준다.

```javascript

const Sequelize = require('sequelize');
//시퀄라이즈 설정들
const env = process.env.NODE_ENV || 'development';
//key가 development인것의 value를 가져온다.
const config = require('../config/config')[env];
//entity들 
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Emotion = require('./emotion');
const Comment = require('./comment');
//db 빈객체
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);
//빈객체에 엔티티와 sequelize 할당
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Emotion = Emotion;
db.Comment = Comment;
//각 모델에서 정의한 init 함수 호출 db가 없으면 자동으로 만들어주고 연동
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Emotion.init(sequelize);
Comment.init(sequelize);
//관계를 정의한다.
User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Emotion.associate(db);
Comment.associate(db);

module.exports = db;
```
 Sequilize를 활용하여 config에 db 메타 데이터를 사용해서 초기화하고 각각의 엔티티들을 빈객체인 db에 등록하고 이를 다 init을 해 db와 연동한다 만약 해당 db가 없다면 자동으로 생성하고 연동한다. 그리고 관계를 정의해주고 이를 export한다.

이제 route를 어떻게 활용할건지 설명할건데 그전에 app.js에서 route설정한 내용을 간략하게 보겠다.

```javascript
const { sequelize } = require('./models');// /models/index
//구조 분해 할당으로 db에서 sequelize 프로퍼티를 변수에 할당한다

sequelize.sync({ force: false })//sequelize연동을 한다.
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });
//...
//정적인 파일들 매핑을 도와주는 미들웨어 static사용
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
//...
//router들 등록
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

```
app.js에 seuquelize관련 설정을 해준다. 저렇게 폴더를 require함수로 import하면 index.js를 받는다.

그리고 sequelize.sync로 연동해준다.

이후에 정적인 파일들을 static함수로 제공할수있게해줬는데 이렇게하면 정적인 파일을 위치를 직접적으로 표시하지 않아도 '/img'처럼 앞에 인자를 주고 뒤에 path.join(__dirname, 'unloads') 을 쓰면 user/file/ubloads/...라고 있으면 이용하는 유저한테는 /img/...로 보여 보안적으로 좋다. 

그리고 마지막으로 등록한 라우터들을 확인할수 있다.

설명하면서 기본설정에대한 내용이 좀 더 길어져있는데 이제 본론으로 돌아가서 좋아요 싫어요 라우터에 대해서 설명하겠다.

```javascript
router.post('/like', isLoggedIn, upload2.none(), async (req, res, next) => {//좋아요 눌렀을때
  try {//json처리할때 꼭 req.body 꼬옥 붙혀야함
    const emotion = await Emotion.findOrCreate({//값을 있으면 추가를하고 없으면 안함 
      where: { PostId: req.body.postId, UserId: req.user.id },//여기있는 부분 찾고
      defaults: {//위에 찾는 내용 없으면 defaults값으로 create
        emotion: Emote.LIKE,
        PostId: req.body.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findByPk(req.body.postId);
    if(emotion[1]){//처음 생성할때 
      await post.increment({like:1}); //좋아요 갯수 증가 
    }
    else if(!emotion[1] && emotion[0].emotion==Emote.HATE){
      await emotion[0].update({emotion:Emote.LIKE});//좋아요로 상태 변경
      await post.increment({like:1});
      await post.decrement({hate:1});// 싫어요 갯수 감소 
    }
    else{
      emotion[0].destroy();//좋아요 삭제 
      await post.decrement({like:1});//좋아요 갯수 감소

    }
      res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```
좋아요를 눌렀을때 rest api를 처리하는 코드이다.

먼저 좋아요를 누르면 좋아요 db가 새로 생겨야 되므로 findorcreate를 사용했다.

findOrCreate 함수를 사용하면 만들려는 db가 이미 존재할 경우 새로 만들지 않고 그 db를 가져온다.

굳이 findOrCreate를 사용한 이유는 좋아요 혹은 싫어요는 같은 사용자가 두번 누르면 취소시키기 위해서이다. 

이를 위해서는 이미생성했는지 여부를 알필요가있는데 findOrCreate는 리턴값으로 배열을 리턴한다. 

이 배열은 첫번째 index는 쿼리결과를 두번째 index는 값이 존재했는지 여부를 나타내는데 이를 활용하면 된다. 

다음으로 좋아요 싫어요를 눌렀을때 그를 얼마나 많은 사람이 눌렀는지 숫자로 나타내야한다.

이를 구현하기 위해 post 모델에 다음과 같은 프로퍼티를 추가하였다.
```javascript
like:{//좋아요 db
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hate:{//싫어요 db
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
```
좋아요 싫어요의 갯수를 나타내는 db다.

이를 sequelize 기본 제공 함수인 increment decrement 함수를 사용해서 증가 감소를 간단하게 구현할수있다.

싫어요 같은 경우도 위와 같으므로 코드만 올리겠다.
```javascript
router.post('/hate', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const emotion = await Emotion.findOrCreate({
      where: { PostId: req.body.postId, UserId: req.user.id},
      defaults: {
        emotion: Emote.HATE,
        PostId: req.body.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findByPk(req.body.postId);
    if(emotion[1]){
      await post.increment({hate:1});
    }
    else if(!emotion[1] && emotion[0].emotion==Emote.LIKE){
      await emotion[0].update({emotion:Emote.HATE});
      await post.increment({hate:1});
      await post.decrement({like:1});
    }
    else{
      emotion[0].destroy();
      await post.decrement({hate:1});

    }
      res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

```

이제 댓글 기능을 리뷰하겠다.

댓글 기능을 구현하기 위해선 새로운 모델을 만들어야하는데 내용은 다음과같다.

```javascript
const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {//댓글 모델
  static init(sequelize) {
    return super.init({
      content: {//댓글내용
        type: Sequelize.STRING(140),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Comment',
      tableName: 'comment',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {//foreign key둘
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsTo(db.User);
  }
};

```
프로퍼티는 댓글내용을 나타내는 content가 있고 나머지는 설정으로 인해 제공하는 프로퍼티들이(createAt updateAt..) 있다. 저위에 model 코드중에 index.js가 있는데 거기서 Comment를 init하고 associate한것을 확인할수있다.

```javascript
router.post('/comment', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {//댓글 등록
    const comment = await Comment.create({//댓글생성 
      content: req.body.content,
      PostId: req.body.postId,
      UserId: req.body.userId,
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```
댓글 추가 restapi를 처리하는 작업이다.

정말 간단하게 request body내용들로 db를 생성하는것을 확인할수있다.

마지막으로 사진첩 기능을 보겠다.

사실 사진첩기능이 제일 간단한게 그냥 router에서 get 처리할때 사진있는것만 따로 정보를 넘기면 된다.

홈페이지를 로그인하면 포스트(좋아요 싫어요와 댓글이 포함되어있는)와 사진첩을 보여줘야 되므로

get / 요청을 할때 이를 다 view에 보내도록 해준다.

그 코드는 page.js에 구현하였는데 다음과 같다.

```javascript
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{//연관관계인 user도 포함시킴 
        model: User,
        attributes: ['id', 'nick'],
      }, {
        model: Comment,//연관관계인 Comment들을 포함시킴 
        include: [{
          model: User,
          attributes: ['id', 'nick'],
        }],
        order: [['createdAt', 'DESC']],//날짜순 정렬
      }],
      order: [['createdAt', 'DESC']],//날짜순 정렬 
    });
    if (req.user != undefined) {//유저 로그인되어있는지 여부 확인
      const imgPosts = await Post.findAll({
        where: {
          img:{
            [Op.ne]: null//null이 아닌것만 검색
          },
          UserId: req.user.id
        },
        order: [['createdAt', 'DESC']],
        attributes: ['img','id'],
      });
      res.render('main', {
        title: 'prj-name',
        twits: posts,
        imgPosts: imgPosts,//이미지가 있는 포스트 배열
      });
    }
    else {
      res.render('main', {
        title: 'prj-name',
        twits: posts,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
```
코드가 좀길고 복잡해보인다 리뷰해보자면 include라는 속성은 연관관계인 db를 추가시켜서 그 쿼리 결과를 가져올수있다. 단순하게 외래키만 가져오는게 아니라 해당하는 모델 자체를 가져온다.

이를 통해 조회하는 Post와 연관관계인 User와 Comment를 그리고 Comment와 연관관계인 User를 조회한다. Post와 Comment는 다대일 관계인데 그래서 Comment는 배열로 오고 변수이름도 Comments로 온다. 즉접근하려면 posts[0].Comments 이처럼 해야된다.

사진첩 같은 경우는 로그인했을때만 보여야 되므로 if문을써 로그인 여부를 확인하도록 하였고
사진만 들어있는 포스트들을 조회해서 넘겨야 하므로 img 프로퍼티가 null이 아닌것이 사진이 들어가있는 포스트 이므로 null이 아닌것만 검색하더록 sequelize를 활용하였다.

이를 위해서는 
```javascript
const Op = require('sequelize').Op
```
Op를 임포트해주고 OP.ne라는 속성을 이용해서 null이 아닌것만 조회하게 하였고 이정보를 imgPosts에 담아 main.html에 렌더링해주었다. 


궁금점들 
passport는 무엇일까?
res.locals.user이거 무엇인가?
req.user는 무엇이고 
multer는 어떻게 사용할까?