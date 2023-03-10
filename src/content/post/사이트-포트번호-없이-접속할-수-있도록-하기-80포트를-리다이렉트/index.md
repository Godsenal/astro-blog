---
title: 사이트 포트번호 없이 접속할 수 있도록 하기 - 80포트를 리다이렉트
date: '2018-03-20'
categories:
  - development
tags:
  - web
  - server
---

글 삭제는 안하지만 nginx등을 사용하여 리버스 프록시를 하자

<!--more-->

예전에 처음 서버를 열었을 때 생각도 못했던 문제가 있었다. 웹 서버를 호스트할 때 자주 사용하는 `8080` 포트(1024 ~ 49151을 well-known port라고 하더라)를 _https://example.com:8080_ 이런식으로 붙여야 됐던 것. 그리고 검색 후에 웹 브라우저의 기본 포트가 `80` 이므로 80으로 열면 되는구나! 하고 열었던 기억이 있다..

Linux 계열에서 1024 포트 밑으로는 root 계정이 아니면 사용할 수 없다. 따라서 sudo를 이용하여 열었어야 했는데, 이렇게 root계정으로 웹 서버를 열면 보안의 문제가 있다. 절대 권장하지 않는 방법이라는 걸 알고 찾은 것이 iptables를 이용하여 80포트를 8080포트로 `포트포워딩` 해주는 것이다. 즉, 80 포트로 들어오는 traffic을 8080포트로 redirect 시켜주는 것.

```js
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

이 명령어를 사용하면 된다. 8080 자리에는 자신의 서버에서 사용할 well-known port를 넣으면 되겠다. 확인해보려면

```js
iptables -t nat -L
```

을 사용하면 된다.

간단히 옵션을 설명하면 `-t nat` 는 iptable에서 prerouting등을 관리하는 nat table을 지정. `-A PREROUTING`는 새로운 prerouting 룰을 추가. `-i eth0`는 인터페이스를 eth0로 지정(그냥 lan으로 연결됐을 때 정할 수 있는 이름 인듯?) `-p tcp`은 프로토콜을 tcp로 지정. `--dport 80`은 도착지포트 `-j`는 패킷이 조건에 맞았을 때(80에 도착했을 때) 어떻게 처리할지를 결정하고, 뒤에 `REDIRECT --to-port 8080`에 따라 8080포트로 리다이렉트하여 처리한다는 것 이다. 하나도 모르겠어서 이 [문서](http://ipset.netfilter.org/iptables.man.html) 를 참고하였다. 어렵다...

쨌든 이런식으로 열어주고 서버를 8080포트로 열어본 후, 포트번호 없이 들어가면 잘 열린다.
