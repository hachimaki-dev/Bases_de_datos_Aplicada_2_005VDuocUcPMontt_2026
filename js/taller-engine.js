// js/taller-engine.js — Vue 3 app logic for CyberDrone workshop
const { createApp, ref, reactive, computed, onMounted, nextTick } = Vue;

const TallerApp = createApp({
  setup() {
    // State
    const duaMode = ref(false);
    const activeTab = ref('tab-strings');
    const polyLevel = ref('n1');
    const progress = reactive(JSON.parse(localStorage.getItem('cyber_progress')||'{"quizzes":{},"hints":{}}'));
    const quizState = reactive({});
    const matchState = reactive({ selected: null, pairs: {}, completed: {} });
    const fillState = reactive({});
    const hintLevels = reactive({ m1:0, m2:0, m3:0, m4:0 });

    function saveProgress() { localStorage.setItem('cyber_progress', JSON.stringify(progress)); }

    // Quiz engine
    function initQuiz(moduleId) {
      const q = TALLER.quizzes[moduleId];
      if (!q) return;
      quizState[moduleId] = q.items.map((item,i) => ({
        ...item, idx:i, answered:false, userAnswer:null, correct:false, showExplain:false
      }));
    }
    function answerVF(moduleId, idx, val) {
      const item = quizState[moduleId][idx];
      if (item.answered) return;
      item.answered = true;
      item.userAnswer = val;
      item.correct = (val === item.answer);
      item.showExplain = true;
      checkQuizComplete(moduleId);
    }
    function answerMulti(moduleId, idx, optIdx) {
      const item = quizState[moduleId][idx];
      if (item.answered) return;
      item.answered = true;
      item.userAnswer = optIdx;
      item.correct = (optIdx === item.answer);
      item.showExplain = true;
      checkQuizComplete(moduleId);
    }
    function answerFill(moduleId, idx) {
      const item = quizState[moduleId][idx];
      if (item.answered) return;
      let allCorrect = true;
      item.gaps.forEach(g => {
        const v = (fillState[moduleId+'_'+g.id]||'').trim();
        if (v.toLowerCase() !== g.answer.toLowerCase() && !(g.acceptAlso||[]).some(a=>a.toLowerCase()===v.toLowerCase())) allCorrect = false;
      });
      item.answered = true;
      item.correct = allCorrect;
      item.showExplain = true;
      if (!allCorrect) item.answered = false; // allow retry
      checkQuizComplete(moduleId);
    }
    // Matching
    function selectMatch(moduleId, idx, side, pairIdx) {
      const key = moduleId+'_'+idx;
      if (!matchState.pairs[key]) matchState.pairs[key] = {};
      if (!matchState.completed[key]) matchState.completed[key] = {};
      if (matchState.completed[key][pairIdx]) return;
      if (!matchState.selected) {
        matchState.selected = { side, pairIdx, key };
      } else {
        if (matchState.selected.side !== side && matchState.selected.key === key) {
          const leftIdx = side==='left' ? pairIdx : matchState.selected.pairIdx;
          const rightIdx = side==='right' ? pairIdx : matchState.selected.pairIdx;
          if (leftIdx === rightIdx) {
            matchState.completed[key][leftIdx] = true;
            // Check if all pairs done
            const item = quizState[moduleId][idx];
            if (Object.keys(matchState.completed[key]).length === item.pairs.length) {
              item.answered = true; item.correct = true; item.showExplain = true;
              checkQuizComplete(moduleId);
            }
          }
        }
        matchState.selected = null;
      }
    }
    function isMatchSelected(moduleId, idx, side, pairIdx) {
      return matchState.selected && matchState.selected.side===side && matchState.selected.pairIdx===pairIdx && matchState.selected.key===moduleId+'_'+idx;
    }
    function isMatchDone(moduleId, idx, pairIdx) {
      const key = moduleId+'_'+idx;
      return matchState.completed[key] && matchState.completed[key][pairIdx];
    }
    function checkQuizComplete(moduleId) {
      const items = quizState[moduleId];
      if (!items) return;
      const allDone = items.every(i => i.answered && i.correct);
      if (allDone) {
        progress.quizzes[moduleId] = true;
        saveProgress();
        if (window.confetti) confetti({ particleCount:80, spread:70, origin:{y:0.7} });
      }
    }
    function isQuizDone(moduleId) { return !!progress.quizzes[moduleId]; }
    function quizProgress(moduleId) {
      const items = quizState[moduleId];
      if (!items || !items.length) return 0;
      return Math.round(items.filter(i=>i.correct).length / items.length * 100);
    }

    // Hints
    function revealHint(mid) {
      const el = document.getElementById(mid+'-hints');
      if (!el) return;
      const hints = el.querySelectorAll('.hint-block');
      if (hintLevels[mid] < hints.length) {
        hints[hintLevels[mid]].classList.add('visible');
        hintLevels[mid]++;
        nextTick(()=>{ if(window.Prism) Prism.highlightAllUnder(el); });
      }
    }

    // Tabs
    function openTab(tabId) { activeTab.value = tabId; }

    // DUA
    function toggleDUA() { duaMode.value = !duaMode.value; }
    function dua(term) { return TALLER.dua.translations[term] || null; }

    // Accordion
    function toggleAcc(id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('acc-open');
    }

    // Shuffle array for matching (deterministic per session)
    function shuffled(arr) {
      const a = [...arr];
      for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]; }
      return a;
    }

    // Init
    onMounted(() => {
      ['strings','dates','agrupacion','subconsultas'].forEach(m => initQuiz(m));
      if(window.mermaid) mermaid.initialize({startOnLoad:true,theme:'dark'});
      nextTick(()=>{ if(window.Prism) Prism.highlightAll(); });
    });

    return {
      duaMode, activeTab, polyLevel, progress, quizState, matchState, fillState, hintLevels,
      answerVF, answerMulti, answerFill, selectMatch, isMatchSelected, isMatchDone,
      isQuizDone, quizProgress, revealHint, openTab, toggleDUA, dua, toggleAcc, shuffled,
      TALLER
    };
  }
});
