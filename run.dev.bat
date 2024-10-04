@echo off
cd be
start uvicorn app.main:app --reload

cd ..
cd fe
start pnpm run dev --mode=development --host=0.0.0.0