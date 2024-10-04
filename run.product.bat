@echo off
cd be
start uvicorn app.main:app --reload --host=0.0.0.0 --port=8001

cd ..
cd fe
start pnpm run dev --mode=production --host=0.0.0.0 --port=87