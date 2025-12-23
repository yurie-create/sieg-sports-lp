
(() => {
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  
    // 0) JS接続チェック（確認できたら後で消してOK）
    // console.log("main.js connected");
  
    // 1) スクロール表示（data-animate）
    const targets = $$('[data-animate]');
  
    // 古い環境はアニメ無しで表示
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-inview'));
      return;
    }
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
  
        entry.target.classList.add('is-inview');
        // 追加：画像は呼吸させる（上品）
if (entry.target.classList.contains('worry-img') ||
entry.target.classList.contains('saino-img') ||
entry.target.classList.contains('youtube-thumb')) {
entry.target.classList.add('is-breathe');
}

// 追加：sectionは入場を少しリッチに
if (entry.target.classList.contains('section')) {
entry.target.classList.add('is-float');
}

        io.unobserve(entry.target); // 1回だけで上品
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px"
    });
  
    targets.forEach(el => io.observe(el));
  
    // 2) CTAを“ちょい強調”（画面に入ったら一度だけ pulse）
    const ctaBtn = $('.btn-cta');
    if (ctaBtn) {
      const ctaIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          ctaBtn.classList.add('is-pulse');
          ctaIO.disconnect();
        });
      }, { threshold: 0.35 });
  
      // 近い要素を監視（なければボタン自身）
      const ctaBox = $('.coach-cta') || ctaBtn;
      ctaIO.observe(ctaBox);
    }
  
    // 3) 牛キャラ：一回だけ “ぷるん”（控えめ）
    const cow = $('.coach-balloon-img');
    if (cow) {
      const cowIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          cow.classList.add('is-pop');
          cowIO.disconnect();
        });
      }, { threshold: 0.5 });
  
      cowIO.observe(cow);
    }
  
    // 4) アンカー遷移を上品に（#contact など）
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = $(id);
        if (!target) return;
  
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      });
    });
  })();
  
  // ===== 牛キャラ：入場 → 少し遅れてぷるん =====
const cow = document.querySelector('.coach-balloon-img');
if (cow && 'IntersectionObserver' in window) {
  const cowIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // まず表示
      cow.classList.add('is-inview');

      // 0.8秒後に一度だけぷるん
      setTimeout(() => {
        cow.classList.add('is-pop');
      }, 800);

      cowIO.disconnect();
    });
  }, {
    threshold: 0.5
  });

  cowIO.observe(cow);
}
