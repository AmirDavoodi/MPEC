// Persian/Farsi translations
export const fa = {
  // Page title
  title: 'تصویرسازی گراف',
  
  // Graph visualization section
  graphVisualization: {
    title: 'تصویرسازی گراف',
    combinedGraphButton: {
      showCombined: 'نمایش گراف ترکیبی',
      showIndividual: 'نمایش گراف‌های جدا'
    },
    noData: 'داده‌ای برای نمایش وجود ندارد',
    layout: {
      force: 'چیدمان نیرو',
      radial: 'چیدمان شعاعی',
      resetZoom: 'بازنشانی بزرگنمایی'
    },
    legend: {
      title: 'راهنما',
      coursePattern: 'الگوی درس',
      proof: 'اثبات',
      test: 'آزمون'
    }
  },
  
  // Content sections
  content: {
    course: {
      title: 'محتوای درس (LaTeX)',
      placeholder: 'محتوای درس را به فرمت LaTeX وارد کنید...',
      extractPattern: 'استخراج الگوی درس'
    },
    proof: {
      title: 'محتوای اثبات (LaTeX)',
      placeholder: 'محتوای اثبات را به فرمت LaTeX وارد کنید...',
      applyPattern: 'اعمال الگو روی اثبات'
    },
    test: {
      title: 'محتوای آزمون (LaTeX)',
      placeholder: 'محتوای آزمون را به فرمت LaTeX وارد کنید...',
      processTest: 'پردازش آزمون'
    }
  },
  
  // Toast messages
  toast: {
    success: {
      coursePattern: 'الگوی درس با موفقیت استخراج شد!',
      patternApplied: 'الگو با موفقیت روی اثبات اعمال شد!',
      testProcessed: 'محتوای آزمون با موفقیت پردازش شد!'
    },
    error: {
      coursePattern: 'خطا در استخراج الگوی درس:',
      patternApplication: 'خطا در اعمال الگو روی اثبات:',
      testProcessing: 'خطا در پردازش محتوای آزمون:',
      loadCourse: 'خطا در بارگذاری الگوی درس. لطفاً ابتدا الگوی درس را استخراج کنید.',
      loadProof: 'خطا در بارگذاری مثلث‌های اثبات. لطفاً ابتدا الگو را روی اثبات اعمال کنید.',
      default: 'یک خطا رخ داده است'
    },
    noCoursePattern: 'لطفاً ابتدا الگوی درس را استخراج کنید',
    noProofTriplets: 'لطفاً ابتدا الگو را روی اثبات اعمال کنید'
  }
};