/**
 * منصة قيمة - JavaScript Controller
 * Matching the exact visual design and interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

  // Process Steps Data for Tabs
  const stepsData = {
    supplier: [
      { num: '01', title: 'عرّفنا بمواردك', desc: 'حدد نوع المورد وكميته، وأرفق الصور وتفاصيل الموقع.' },
      { num: '02', title: 'احصل على التقييم', desc: 'تقيّم قيمة مواردك وتربطك بالمشتري المناسب.' },
      { num: '03', title: 'نسّق الاستلام', desc: 'يتولى شركاؤنا اللوجستيون النقل وفق الاتفاق.' },
      { num: '04', title: 'حقّق القيمة والأثر', desc: 'تابع الصفقة واطلع على الأثر الناتج عن مواردك.' }
    ],
    buyer: [
      { num: '01', title: 'استعرض المواد الخام', desc: 'تصفح مخزون الموارد المتاح من ورق، بلاستيك، ومعادن.' },
      { num: '02', title: 'قدّم طلب الشراء', desc: 'حدد الكمية المطلوبة والمواصفات الفنية وجداول التوريد.' },
      { num: '03', title: 'المطابقة والتأكيد', desc: 'تنسيق فحص الجودة وتأكيد الشحنة وضمان التدفق.' },
      { num: '04', title: 'استلم المورد في مصنعك', desc: 'وصول الشحنة لخطوط الإنتاج مع إصدار شهادة ESG المعتمدة.' }
    ],
    partner: [
      { num: '01', title: 'سجّل أسطولك اللوجستي', desc: 'انضم كشريك نقل معتمد وحمّل بيانات الشاحنات والتراخيص.' },
      { num: '02', title: 'استقبل مهام النقل', desc: 'تلقي إشعارات المسارات والوجهات بناءً على النطاق الجغرافي.' },
      { num: '03', title: 'الوزن والتحقق الرقمي', desc: 'توثيق أوزان الشحنات واستلام بوليصة الشحن الإلكترونية.' },
      { num: '04', title: 'إتمام المهمة والتحصيل', desc: 'تسليم المواد لمصنع التدوير وتسوية المستحقات آلياً.' }
    ]
  };

  const processTabs = document.querySelectorAll('.process-tab-btn');
  const stepsContainer = document.getElementById('processStepsContainer');

  function renderSteps(role) {
    if (!stepsContainer) return;
    const steps = stepsData[role] || stepsData.supplier;
    stepsContainer.innerHTML = '';

    steps.forEach(step => {
      const box = document.createElement('div');
      box.className = 'step-flow-box';
      box.innerHTML = `
        <div class="step-number-circle">${step.num}</div>
        <h4>${step.title}</h4>
        <p>${step.desc}</p>
      `;
      stepsContainer.appendChild(box);
    });
  }

  processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      processTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const role = tab.getAttribute('data-role');
      renderSteps(role);
    });
  });

  // Portal Tab Switching (if on portal.html)
  const portalTabButtons = document.querySelectorAll('.portal-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (portalTabButtons.length > 0) {
    const urlParams = new URLSearchParams(window.location.search);
    const targetTab = urlParams.get('tab') || 'supplier';

    function switchPortalTab(tabId) {
      portalTabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      tabPanes.forEach(pane => {
        if (pane.id === `${tabId}-pane`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    }

    switchPortalTab(targetTab);

    portalTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        switchPortalTab(tabId);
      });
    });
  }

  // Helper ESG Report Function
  window.generateEsgReport = function(companyName) {
    const certNum = "ESG-KSA-" + Math.floor(100000 + Math.random() * 900000);
    alert(`تم إصدار تقرير الامتثال والاستدامة (ESG) بنجاح للمنشأة: ${companyName}\nالرقم المرجعي المعتمد: ${certNum}\nمطابق لمعايير مبادرة السعودية الخضراء والإفصاح البيئي.`);
  };

  // Helper Approve Order Function
  window.approveOrder = function(orderId) {
    const el = document.getElementById(`status-${orderId}`);
    if (el) {
      el.className = 'badge-status success';
      el.textContent = 'معتمد وتم التعيين';
      alert(`تمت المصادقة على العملية ${orderId} وتعيين الشاحنة اللوجستية بنجاح.`);
    }
  };

});
