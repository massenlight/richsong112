import React, { useState } from 'react';
import { Github, X, Copy, Check, Terminal, FileCode, ExternalLink, Sparkles } from 'lucide-react';

interface GithubDeployGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubDeployGuide: React.FC<GithubDeployGuideProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const viteConfigCode = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // 關鍵：設置相對路徑，確保 GitHub Pages 能正確載入 static 資源
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});`;

  const githubActionsYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#050505] border border-red-900/60 rounded-sm shadow-2xl overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-red-900/40 flex items-center justify-between bg-[#0f0f0f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black border border-red-800 flex items-center justify-center text-white rounded-sm">
              <Github className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">GitHub Pages 免費一鍵部署指南</h3>
              <p className="text-xs font-mono text-neutral-400">
                本網頁為標準 React + Vite 靜態單頁應用 (SPA)，可直接免費託管於 GitHub Pages
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-300">
          
          {/* Step 1 */}
          <div className="p-5 rounded-sm bg-[#0f0f0f] border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white font-display">
                <span className="w-6 h-6 rounded-sm bg-red-800 text-xs flex items-center justify-center font-mono">1</span>
                <span>檢查並確認 <code className="text-red-400 font-mono text-xs">vite.config.ts</code> 相對路徑設定</span>
              </div>
              <button
                onClick={() => handleCopy(viteConfigCode, 'viteConfig')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-black hover:bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 cursor-pointer"
              >
                {copiedStep === 'viteConfig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStep === 'viteConfig' ? '已複製' : '複製代碼'}</span>
              </button>
            </div>
            <p className="text-xs text-neutral-400">
              在 <code className="text-red-400 font-mono">vite.config.ts</code> 加入 <code className="text-red-400 font-mono">base: './'</code> 即可避免資源路徑 404 錯誤：
            </p>
            <pre className="p-3 rounded-sm bg-black text-xs font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
              {viteConfigCode}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-sm bg-[#0f0f0f] border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white font-display">
              <span className="w-6 h-6 rounded-sm bg-red-800 text-xs flex items-center justify-center font-mono">2</span>
              <span>方法 A：使用 gh-pages 套件（推薦最快速）</span>
            </div>
            <p className="text-xs text-neutral-400">在終端機中執行以下指令即可直接打包發布：</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-sm bg-black font-mono text-xs text-red-400 border border-neutral-800">
                <span>npm install -D gh-pages</span>
                <button
                  onClick={() => handleCopy('npm install -D gh-pages', 'cmd1')}
                  className="p-1 hover:text-white"
                >
                  {copiedStep === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-sm bg-black font-mono text-xs text-red-400 border border-neutral-800">
                <span>npx gh-pages -d dist</span>
                <button
                  onClick={() => handleCopy('npm run build && npx gh-pages -d dist', 'cmd2')}
                  className="p-1 hover:text-white"
                >
                  {copiedStep === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-sm bg-[#0f0f0f] border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white font-display">
                <span className="w-6 h-6 rounded-sm bg-red-800 text-xs flex items-center justify-center font-mono">3</span>
                <span>方法 B：使用 GitHub Actions 自動化 CI/CD</span>
              </div>
              <button
                onClick={() => handleCopy(githubActionsYaml, 'yaml')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-sm bg-black hover:bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 cursor-pointer"
              >
                {copiedStep === 'yaml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStep === 'yaml' ? '已複製' : '複製 Workflow YAML'}</span>
              </button>
            </div>
            <p className="text-xs text-neutral-400">
              在 GitHub 專案庫新增檔案 <code className="text-red-400 font-mono">.github/workflows/deploy.yml</code>，每次 push 到 main 即可全自動完成部署：
            </p>
            <pre className="p-3 rounded-sm bg-black text-xs font-mono text-neutral-300 overflow-x-auto border border-neutral-800">
              {githubActionsYaml}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#0f0f0f] flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-500">✅ 原始碼具備完全相容性</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-800 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
          >
            理解並關閉
          </button>
        </div>

      </div>
    </div>
  );
};
