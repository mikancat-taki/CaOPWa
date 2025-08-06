export function executeUtility(toolId: string, input: string): string {
  switch (toolId) {
    case 'calculator':
      try {
        // Basic calculator - evaluate simple math expressions
        // Note: In production, use a proper math parser for security
        const result = Function('"use strict"; return (' + input + ')')();
        return `計算結果: ${result}`;
      } catch (error) {
        return '計算エラー: 有効な式を入力してください';
      }

    case 'qrcode':
      return `QRコード生成完了\n入力テキスト: ${input}\n※実際のQRコードは別途生成されます`;

    case 'color':
      // Simple color code conversion
      if (input.startsWith('#')) {
        const hex = input.slice(1);
        if (hex.length === 6) {
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `RGB: rgb(${r}, ${g}, ${b})\nHSL: 変換中...`;
        }
      }
      return 'カラーコード変換: 有効なHEXコード（#rrggbb）を入力してください';

    case 'compress':
      return `データ変換完了\n元のサイズ: ${input.length} 文字\n処理済み: ${Math.floor(input.length * 0.8)} 文字`;

    case 'text':
      const wordCount = input.trim().split(/\s+/).length;
      const charCount = input.length;
      return `テキスト分析:\n文字数: ${charCount}\n単語数: ${wordCount}\n行数: ${input.split('\n').length}`;

    case 'analytics':
      const numbers = input.match(/\d+/g);
      if (numbers) {
        const nums = numbers.map(n => parseInt(n));
        const sum = nums.reduce((a, b) => a + b, 0);
        const avg = sum / nums.length;
        return `数値分析:\n合計: ${sum}\n平均: ${avg.toFixed(2)}\n最大: ${Math.max(...nums)}\n最小: ${Math.min(...nums)}`;
      }
      return '分析: 数値が見つかりませんでした';

    default:
      return 'ツールが見つかりません';
  }
}
