# ITLA.com  
ITLA.com (started from OSS Camp)  
  it에 관련된 피드들을 쉽게 찾아볼 수 있는 어플리케이션
  
# 프로젝트 명 : ITLA.com  
(ITLA : IT Life Assistant)  
# 팀 명 : ITLA Developers  
중위 나기현
상병 박성환  

# 기능
## 1.DB 이용 로그인 기능  
로그인 및 개인정보 편집, 카테고리 편집 기능을 이용해서 사용자에 따라 다른 컨텐츠를 제공할 수 있습니다. 
## 2.피드 편집 기능  
자동으로 추가되는 피드 외에도 사용자가 원하는 사이트 추가 기능을 제공합니다. 피드들은 카테고리와 작성일, 사용자의 평가 여부를 바탕으로 분류됩니다. 사용자가 피드를 평가할 경우 북마크에 추가됩니다. 
## 3.피드 열람 기능
피드를 보기 위해 다른 페이지로 가거나 새 창을 띄울 필요 없이 한 화면에서 바로 열람할 수 있습니다. 

## 업데이트 예정
관심있는 피드와 관련된 상품 가격을 표시와 최저가 알림 기능 추가 예정

# 개발문서
https://balsamiq.cloud/swthp68/pwo1xkn (기본 프로로타입)
https://docs.google.com/document/d/1xBDBdWWrMIab-a8WSG9PtQBa61FpE6M1JH6Okmz-ljU/edit?usp=sharing (데이터 관련 토의)

#ITLA.com (ver.0.2) / 실행방법

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Install json-server for import-export local storage
```
npm install -g json-server
```

### Run the json-server with appropriate files
this project needs some json files (in /public/mockup)
```
npm run local-server (type this in new terminal)
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
