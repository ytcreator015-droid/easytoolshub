// EasyTools Hub — Interactive Calculators & Navigation Logic

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPercentageCalculator();
  initAgeCalculator();
  initContactForm();
  setCurrentYear();
});

/* --------------------------------------------------------------------------
   Navigation: Mobile Menu Toggle & Smooth Close
   -------------------------------------------------------------------------- */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });

    // Close mobile nav when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Percentage Calculator (3 Different Modes)
   -------------------------------------------------------------------------- */
function initPercentageCalculator() {
  // Tabs switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.add('active');
    });
  });

  // Mode 1: What is X% of Y?
  const btnCalcP1 = document.getElementById('btn-calc-p1');
  const btnResetP1 = document.getElementById('btn-reset-p1');
  const inP1Percent = document.getElementById('p1-percent');
  const inP1Total = document.getElementById('p1-total');
  const resBoxP1 = document.getElementById('result-p1');
  const valP1 = document.getElementById('val-p1');
  const stepP1 = document.getElementById('step-p1');

  function calculateP1() {
    const x = parseFloat(inP1Percent.value);
    const y = parseFloat(inP1Total.value);

    if (isNaN(x) || isNaN(y)) {
      alert('Please enter valid numbers for both fields.');
      return;
    }

    const answer = (x / 100) * y;
    const formatted = formatNumber(answer);
    valP1.textContent = formatted;
    stepP1.textContent = `Formula: (${x} / 100) × ${y} = ${formatted}`;
    resBoxP1.style.display = 'block';
  }

  btnCalcP1.addEventListener('click', calculateP1);
  btnResetP1.addEventListener('click', () => {
    inP1Percent.value = '';
    inP1Total.value = '';
    resBoxP1.style.display = 'none';
  });

  // Mode 2: X is what % of Y?
  const btnCalcP2 = document.getElementById('btn-calc-p2');
  const btnResetP2 = document.getElementById('btn-reset-p2');
  const inP2Part = document.getElementById('p2-part');
  const inP2Whole = document.getElementById('p2-whole');
  const resBoxP2 = document.getElementById('result-p2');
  const valP2 = document.getElementById('val-p2');
  const stepP2 = document.getElementById('step-p2');

  function calculateP2() {
    const part = parseFloat(inP2Part.value);
    const whole = parseFloat(inP2Whole.value);

    if (isNaN(part) || isNaN(whole)) {
      alert('Please enter valid numbers for both fields.');
      return;
    }

    if (whole === 0) {
      alert('Total amount (Y) cannot be zero.');
      return;
    }

    const answer = (part / whole) * 100;
    const formatted = formatNumber(answer);
    valP2.textContent = `${formatted}%`;
    stepP2.textContent = `Formula: (${part} / ${whole}) × 100 = ${formatted}%`;
    resBoxP2.style.display = 'block';
  }

  btnCalcP2.addEventListener('click', calculateP2);
  btnResetP2.addEventListener('click', () => {
    inP2Part.value = '';
    inP2Whole.value = '';
    resBoxP2.style.display = 'none';
  });

  // Mode 3: Percentage Increase / Decrease
  const btnCalcP3 = document.getElementById('btn-calc-p3');
  const btnResetP3 = document.getElementById('btn-reset-p3');
  const inP3Initial = document.getElementById('p3-initial');
  const inP3Final = document.getElementById('p3-final');
  const resBoxP3 = document.getElementById('result-p3');
  const valP3 = document.getElementById('val-p3');
  const stepP3 = document.getElementById('step-p3');

  function calculateP3() {
    const initial = parseFloat(inP3Initial.value);
    const finalVal = parseFloat(inP3Final.value);

    if (isNaN(initial) || isNaN(finalVal)) {
      alert('Please enter both initial and final values.');
      return;
    }

    if (initial === 0) {
      alert('Initial value cannot be zero.');
      return;
    }

    const diff = finalVal - initial;
    const change = (diff / Math.abs(initial)) * 100;
    const formatted = formatNumber(Math.abs(change));

    if (change > 0) {
      valP3.textContent = `+${formatted}% Increase`;
      valP3.style.color = '#34d399';
      stepP3.textContent = `Value increased by ${formatNumber(diff)}. Formula: (${diff} ÷ ${initial}) × 100`;
    } else if (change < 0) {
      valP3.textContent = `-${formatted}% Decrease`;
      valP3.style.color = '#f87171';
      stepP3.textContent = `Value decreased by ${formatNumber(Math.abs(diff))}. Formula: (${diff} ÷ ${initial}) × 100`;
    } else {
      valP3.textContent = `0% No Change`;
      valP3.style.color = 'var(--text-main)';
      stepP3.textContent = `Initial and final values are identical.`;
    }

    resBoxP3.style.display = 'block';
  }

  btnCalcP3.addEventListener('click', calculateP3);
  btnResetP3.addEventListener('click', () => {
    inP3Initial.value = '';
    inP3Final.value = '';
    valP3.style.color = 'var(--primary)';
    resBoxP3.style.display = 'none';
  });
}

/* --------------------------------------------------------------------------
   Age Calculator with Breakdown & Insights
   -------------------------------------------------------------------------- */
function initAgeCalculator() {
  const birthInput = document.getElementById('birth-date');
  const targetInput = document.getElementById('target-date');
  const btnCalcAge = document.getElementById('btn-calc-age');
  const btnTodayAge = document.getElementById('btn-today-age');

  const ageResultBox = document.getElementById('ageResultBox');
  const primaryAgeText = document.getElementById('primaryAgeText');
  const statMonths = document.getElementById('statMonths');
  const statWeeks = document.getElementById('statWeeks');
  const statDays = document.getElementById('statDays');
  const statHours = document.getElementById('statHours');
  const nextBirthdayText = document.getElementById('nextBirthdayText');
  const dayOfWeekBorn = document.getElementById('dayOfWeekBorn');
  const zodiacSign = document.getElementById('zodiacSign');

  // Set default target date to Today
  const today = new Date();
  const formatIsoDate = d => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  targetInput.value = formatIsoDate(today);

  // Set a sensible default birth date for instant testing (e.g., 2000-01-01)
  birthInput.value = '2000-01-01';

  function calculateAge() {
    if (!birthInput.value) {
      alert('Please select your Date of Birth.');
      return;
    }

    const birth = new Date(birthInput.value + 'T00:00:00');
    const target = targetInput.value ? new Date(targetInput.value + 'T00:00:00') : new Date();

    if (birth > target) {
      alert('Date of birth cannot be in the future of the target date.');
      return;
    }

    // Exact Years, Months, Days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get previous month's total days
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    primaryAgeText.textContent = `${years} Years, ${months} Months, ${days} Days`;

    // Metric Totals
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMonths = (years * 12) + months;

    statMonths.textContent = totalMonths.toLocaleString();
    statWeeks.textContent = totalWeeks.toLocaleString();
    statDays.textContent = totalDays.toLocaleString();
    statHours.textContent = totalHours.toLocaleString();

    // Day of the week born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayOfWeekBorn.textContent = daysOfWeek[birth.getDay()];

    // Zodiac sign
    zodiacSign.textContent = getZodiacSign(birth.getDate(), birth.getMonth() + 1);

    // Next Birthday calculation
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const diffToBday = nextBday.getTime() - target.getTime();
    const daysToBday = Math.ceil(diffToBday / (1000 * 60 * 60 * 24));

    if (daysToBday === 0) {
      nextBirthdayText.textContent = '🎉 Today! Happy Birthday!';
    } else {
      nextBirthdayText.textContent = `${daysToBday} day${daysToBday === 1 ? '' : 's'}`;
    }

    ageResultBox.style.display = 'block';
  }

  btnCalcAge.addEventListener('click', calculateAge);
  btnTodayAge.addEventListener('click', () => {
    targetInput.value = formatIsoDate(new Date());
    calculateAge();
  });

  // Calculate on initial load for instant delight
  calculateAge();
}

/* Zodiac helper */
function getZodiacSign(day, month) {
  const zodiacSigns = [
    { sign: 'Capricorn ♑', endDay: 19 },
    { sign: 'Aquarius ♒', endDay: 18 },
    { sign: 'Pisces ♓', endDay: 20 },
    { sign: 'Aries ♈', endDay: 19 },
    { sign: 'Taurus ♉', endDay: 20 },
    { sign: 'Gemini ♊', endDay: 20 },
    { sign: 'Cancer ♋', endDay: 22 },
    { sign: 'Leo ♌', endDay: 22 },
    { sign: 'Virgo ♍', endDay: 22 },
    { sign: 'Libra ♎', endDay: 22 },
    { sign: 'Scorpio ♏', endDay: 21 },
    { sign: 'Sagittarius ♐', endDay: 21 },
    { sign: 'Capricorn ♑', endDay: 31 }
  ];

  if (day <= zodiacSigns[month - 1].endDay) {
    return zodiacSigns[month - 1].sign;
  }
  return zodiacSigns[month].sign;
}

/* Number formatting */
function formatNumber(num) {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return parseFloat(num.toFixed(4)).toString();
}

/* --------------------------------------------------------------------------
   Contact Us Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  if (!form || !status) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      status.className = 'contact-status error';
      status.textContent = 'Please fill in all required fields.';
      status.style.display = 'block';
      return;
    }

    // Basic email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.className = 'contact-status error';
      status.textContent = 'Please provide a valid email address.';
      status.style.display = 'block';
      return;
    }

    // Success response
    status.className = 'contact-status success';
    status.textContent = `Thank you, ${name}! Your feedback has been received. We'll reply to ${email} soon.`;
    status.style.display = 'block';
    form.reset();

    setTimeout(() => {
      status.style.display = 'none';
    }, 6000);
  });
}

function setCurrentYear() {
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();
}
