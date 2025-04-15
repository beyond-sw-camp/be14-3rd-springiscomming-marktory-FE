# MarkTory, 기술을 넘어 이야기를 담는 공간

![메인이미지](./docs/banner/front_banner.png)



<br>

# :cherry_blossom: 봄이오조 :cherry_blossom:

<table>
  <tr>
    <td><img src="./docs/member/Kasey.JPEG" width="150" height="150"/></td>
    <td><img src="./docs/member/D.JPEG" width="150" height="150"/></td>
    <td><img src="./docs/member/Alex.JPEG" width="150" height="150"/></td>
    <td><img src="./docs/member/Morris.JPEG" width="150" height="150"/></td>
    <td><img src="./docs/member/Dong.png" width="150" height="150"/></td>
    <td><img src="./docs/member/Tim.jpeg" width="150" height="150"/></td>
  </tr>
  <tr>
    <td>:crown:주아현</td>
    <td>강이도은</td>
    <td>곽우석</td>
    <td>이상모</td>
    <td>정동한</td>
    <td>한윤상</td>
  </tr>
</table>


# 기술스택


## 🛠️ Backend
![Java](https://img.shields.io/badge/Java-17-007396.svg?&logo=java&color=red)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F.svg?&logo=spring-boot&color=lightgreen)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F.svg?&logo=spring-data-JPA)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C.svg?&logo=hibernate)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F.svg?&logo=spring-security&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000.svg?&logo=json-web-token&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?&logo=gradle)
![JUnit5](https://img.shields.io/badge/JUnit5-25A162.svg?&logo=junit5&logoColor=white&color=green)

## 💽 DB
<!--![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420.svg?&logo=ubuntu&logoColor=white)-->
![MariaDB](https://img.shields.io/badge/MariaDB-003545.svg?&logo=mariadb)
<img src="https://img.shields.io/badge/MyBatis-FF5733?style=flat&logo=MyBatis&logoColor=white">
<!--!![Redis](https://img.shields.io/badge/Redis-DC382D.svg?&logo=redis&logoColor=white)-->

## ⛓️ Server
<img src="https://img.shields.io/badge/Eureka%20Server-4D8FC9?style=flat&logo=Spring&logoColor=white">

## ⚙ Tool
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/ERD%20cloud-%230000FF.svg?style=flat&logo=erlang&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/DA%23-0B6121.svg?style=flat&logo=draw.io&logoColor=white"> &nbsp; <!--<img src="https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black"> &nbsp; <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=Ubuntu&logoColor=white">--><img src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=flat&logo=IntelliJ%20IDEA&logoColor=white">

<br>

<hr>

<br>

# 목차
1. [프로젝트 개요](#프로젝트-개요)
    - [개발 배경](#개발-배경)
    - [주요 기능](#주요-기능)
    - [차별성](#차별성)
2. [설계 문서](#설계-문서)
    - [WBS](#WBS)
    - [기능명세서](#기능-명세서)
    - [System Architecture](#System-Architecture)
    - [FLOW CHART](#FLOW-CHART)
    - [DDD](#DDD)
    - [DB 모델링](#DB-모델링)
3. [산출물](#산출물)
    - [와이어프레임](#와이어프레임)
    - [스토리보드](#스토리보드)
    - [TestCase](#TestCase)
    - [결과 화면](#결과화면)
4. [Peer Review](#Peer-Review)

<br>

<hr>

<br>

# 1. 프로젝트 개요
> 자기 PR의 시대, 나만의 개발자 공간을 만들다. 지루한 기술 블로그에서 벗어나 자유롭게 글을 작성하고, 나만의 스타일로 PR할 수 있는 공간!
> MarkTory는 Markdown 기반으로 간편하게 블로그를 운영하고, 개발자 간 소통과 네트워킹을 지원합니다. 기술을 공유하는 것에서 한 걸음 더 나아가, 커스텀 템플릿을 통해 나만의 색깔을 표현하고 성잘할 수 있는 커뮤니티를 제공합니다. 이제 개발자의 글쓰기는 단순한 기록이 아닌, 개인의 브랜딩과 연결되는 새로운 경험이 됩니다. 쉽고 자유로운 글쓰기, 더 넓은 개발자 네트워크! 지금 MarkTory와 함께 나만의 공간을 만들어보세요.

<br>

##  💡개발 배경
### 1️⃣ 개발자 블로그의 한계와 PR 공간의 부재
기술 블로그는 개발자의 성장과 지식 공유의 필수적인 도구이지만, 기존 플랫폼은 개발자 친화적인 기능 부족, 네트워크 제한, Markdown 지원 미흡 등의 문제를 가지고 있습니다. 또한, 개인 포트폴리오와 연결된 자기 PR 공간이 부족하여 개발자들이 자신의 기술력을 효과적으로 표현하기 어려운 상황입니다. 이에 따라, Markdown 기반의 블로그와 PR 페이지를 결합한 새로운 플랫폼이 필요합니다.

### 2️⃣ 자유로운 글쓰기와 네트워킹의 필요성
개발자들은 기술 공유뿐만 아니라 템플릿을 활용한 효율적인 글 작성, 네트워크 형성, 피드백 교류를 원합니다. 하지만 기존 블로그 플랫폼은 구독, 템플릿 공유, 개발자 간 연결 기능이 부족하여 단순한 글쓰기 공간에 머물러 있습니다. 따라서, 개발자들이 기술을 공유하면서도 서로 연결될 수 있는 새로운 커뮤니티가 필요합니다.

<br>

## 💡주요 기능
### 1️⃣ Markdown 기반의 간편한 글쓰기
개발자들이 익숙한 Markdown 문법을 사용하여 손쉽게 글을 작성하고 관리할 수 있습니다.

### 2️⃣ 커스터마이징 가능한 템플릿
다양한 템플릿을 제공하여 사용자가 자신의 스타일에 맞게 블로그를 꾸밀 수 있습니다.

### 3️⃣ 개발자 네트워킹 지원
다른 개발자들의 블로그를 구독하고, 댓글과 피드백을 주고받으며, 협업의 기회를 넓힐 수 있습니다.

### 4️⃣ 포트폴리오
자유롭게 작성한 글과 템플릿을 통해 자신만의 개성있는 포트폴리오를 만들 수 있습니다.

### 5️⃣ 다크모드
개발자에게 익숙한 다크모드로 설계하여 눈에 편안하고 몰입감 있는 환경을 제공합니다.

<br>

## 💡차별성
![차별성이미지](./docs/necessity/necessity.png)

### 1️⃣ 개발자 중심의 기능 제공
기존 플랫폼들이 가지는 Markdown 지원 미흡, 제한적인 커스터마이징 등의 문제를 해결하여 개발자 친화적인 환경을 제공합니다.

### 2️⃣ 네트워킹과 커뮤니티 강화
단순한 블로깅을 넘어 개발자 간의 소통과 협업을 촉진하는 기능을 제공합니다.

<br>

<hr>

<br>

# 2. 설계 문서
## [📑WBS](https://docs.google.com/spreadsheets/d/1DkXVfFpTnMltTDK30AYLfIE4DF1XI41m6rV6_ur3oXA/edit?gid=1599321018#gid=1599321018)
[![img.png](img.png)]

<br>

## [📑기능 명세서]()
![요구사항명세서이미지](./docs/reqDoc/요구사항명세서.png)

<br>

## 📑System Architecture

<br>

## 📑FLOW CHART

<br>

## 📑DDD

<br>

# 📑DB모델링

<br>

### 1️⃣ 플로우차트

### 2️⃣ 논리모델링

<img src="https://github.com/user-attachments/assets/bf47f0ca-7cf4-49d7-92cd-6c14674ebc37" width=700>

### 3️⃣ 물리모델링
<img src="https://github.com/user-attachments/assets/cdc3f2e9-83c3-4612-ba14-2028e9f8e311" width=700>
<br>


# 3. 산출물
## 📍와이어프레임

<br>

## 📍스토리보드

<br>

## 📍Test Case

<br>

## 📍결과 화면

<br>

<hr>

<br>

# 4. Peer Review
### 주아현
| Team Member | Peer Review |
|-------------|-------------|
| 강이도은      |             |
| 곽우석       |             |
| 이상모       |             |
| 정동한       |             |
| 한윤상       |             |

### 강이도은
| Team Member | Peer Review |
|-------------|-------------|
| 주아현       |             |
| 곽우석       |             |
| 이상모       |             |
| 정동한       |             |
| 한윤상       |             |

### 곽우석
| Team Member | Peer Review |
|-------------|------------|
| 주아현       |            |
| 강이도은      |            |
| 이상모       |            |
| 정동한       |            |
| 한윤상       |            |

### 이상모
| Team Member | Peer Review |
|------------|-------------|
| 주아현        |             |
| 강이도은       |             |
| 곽우석        |             |
| 정동한        |             |
| 한윤상        |             |

### 정동한
| Team Member | Peer Review |
|-------------|-------------|
| 주아현         |             |                                                                                                                                                                                                                                                                                  |
| 강이도은        |             |
| 곽우석         |             |     
| 이상모         |             |
| 한윤상         |             |

### 한윤상
| Team Member | Peer Review |
|-------------|-------|
| 주아현       ||
| 강이도은      ||
| 곽우석       ||
| 이상모       ||
| 정동한       ||
