# Nginx 이미지를 사용합니다.
FROM nginx:alpine

# 기본 Nginx 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 사용자 정의 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 파일을 Nginx의 html 디렉토리에 복사합니다.
COPY ./build /usr/share/nginx/html

# Nginx 포트 80을 노출합니다.
EXPOSE 80

# 컨테이너 시작 시 Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
