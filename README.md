VISHOP
============
## 팀원

- 카이스트 전산학부 김현아
- 카이스트 전산학부 박준서

## 소개

- 구매하고 싶은 물건이 있는 탭을 캡처하면 쇼핑을 가능하게 만들어줍니다.
- 구글 비전 api를 이용해 object localizer로 물건이 어디있는지를 확인해주고, 그 물건이 어떤 종류인지 알려줍니다.
- 다양한 브랜드의 물건을 사이드 패널을 통해 추천해주고, 쇼핑을 하는 창으로 넘어갈 수 있습니다.
- 핀 기능을 이용하여 나중에 그 물건을 확인할 수 있습니다.

## 개발 환경

- Frontend: React
- Backend: Django
- Database: MySQL
- Server: AWS

## 기능 소개

**로그인 & 회원가입 화면**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/2fd38de4-f8f1-4bb6-9253-d66bc7d8eb89/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/b1e5fdcc-8d3e-42e8-8c70-f7daf9dc38cc/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/04d00920-a06b-4380-9725-6e1ce7ea279f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/6337dfc5-58b6-420f-8e74-b8251c93cb61/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/4767c333-6042-4c59-8c1b-4bab41b5fa5a/Untitled.png)

- 크롬 익스텐션 옵션 페이지를 통해 회원 가입을 할 수 있습니다.
- 회원 가입 후 본인의 이름과 관심사를 입력하게 됩니다.
- 그 후 이메일로 인증을 하면 회원 가입이 완료됩니다.
- 옵션 페이지를 통해 로그인을 할 수 있고, 툴바를 통해 로그인을 할 수도 있습니다.

**실행 화면** 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/43543eab-e0e9-428f-832d-28e89bb52038/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/e10c1338-dad1-436d-bb31-21a37c2ff8aa/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/6b1f85b6-f2d7-416d-b8ed-4b35a886776e/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/63d77636-2216-4c8a-aa82-2bf35f44127f/Untitled.png)

- 크롬에서 툴바를 이용해서 캡처를 할 수 있고, 캡처를 하면 구글 비전 api를 이용해 object localizer로 물건이 어디있는지를 확인해주고, 그 물건이 어떤 종류인지 알려줍니다.
- 다양한 브랜드의 물건을 사이드 패널을 통해 추천해주고, 쇼핑을 하는 창으로 넘어갈 수 있습니다
- 핀 기능을 설정하여 옵션 화면에서 볼 수 있습니다.

**옵션 화면** 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/af8edb96-c90b-46c3-ad19-6d53378b319a/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/b909067a-35e2-4feb-a339-40f6f54bdd45/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/1477b2ef-f924-48cd-b312-da7a538723f7/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/7a1ef524-f36f-45f2-a848-2ab0cc95150d/Untitled.png)

- 크롬 익스텐션 옵션 페이지에서는 회원 정보를 수정할 수 있습니다.
- 핀을 할 상품들을 저장할 보드를 생성, 수정, 삭제할 수 있습니다.
- 위시리스트를 보드에 들어가서 따로 볼 수 있습니다.
