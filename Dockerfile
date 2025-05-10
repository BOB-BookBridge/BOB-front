# 1단계: 빌드
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm ci

# 앱 전체 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 실행
FROM node:20-alpine

# 시스템 환경 세팅
ENV NODE_ENV=production
WORKDIR /app

# 빌드 결과물과 의존성 복사
COPY --from=builder /app ./

# Next.js는 3000 포트 사용
EXPOSE 3000

# 서버 실행 (SSR)
CMD ["npm", "run", "start"]
