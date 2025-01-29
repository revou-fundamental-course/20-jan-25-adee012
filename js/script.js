const form = document.getElementById('bmiForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    
    // Ambil Data by Id
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    // Validasi
    let isValid = true;
    
    if (!gender) {
        document.getElementById('genderError').textContent = 'Silakan pilih jenis kelamin';
        isValid = false;
    }
    
    if (!weight || weight <= 0 || weight > 200) {
        document.getElementById('weightError').textContent = 'Berat badan harus antara 0-200 kg';
        isValid = false;
    }
    
    if (!height || height <= 0 || height > 250) {
        document.getElementById('heightError').textContent = 'Tinggi badan harus antara 0-250 cm';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Hitung BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Logic BMI
    let category, description, resultColor;
    
    if (bmi < 18.5) {
        category = 'Berat Badan Kurang';
        description = 'Anda memiliki berat badan kurang dari normal. Disarankan untuk meningkatkan asupan nutrisi dan berkonsultasi dengan ahli gizi untuk program penambahan berat badan yang sehat.';
        resultColor = '#3498db';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Berat Badan Normal';
        description = 'Selamat! Berat badan Anda berada dalam kategori normal. Pertahankan pola makan sehat dan rutin berolahraga.';
        resultColor = '#2ecc71';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Kelebihan Berat Badan';
        description = 'Anda memiliki berat badan berlebih. Disarankan untuk mengatur pola makan dan meningkatkan aktivitas fisik.';
        resultColor = '#f1c40f';
    } else {
        category = 'Obesitas';
        description = 'Anda termasuk dalam kategori obesitas. Sangat disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk program penurunan berat badan yang sehat.';
        resultColor = '#e74c3c';
    }
    
    // Tampilan hasil
    resultDiv.style.backgroundColor = resultColor + '20';
    resultDiv.style.borderLeft = `5px solid ${resultColor}`;
    
    document.getElementById('bmiValue').textContent = `BMI: ${bmi.toFixed(1)}`;
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiDescription').textContent = description;
    
    resultDiv.classList.add('show');
});

// Reset form
form.addEventListener('reset', function() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    resultDiv.classList.remove('show');
    setTimeout(() => {
        resultDiv.style.backgroundColor = '';
        resultDiv.style.borderLeft = '';
    }, 300);
});

// Hapus hasil dan inputan
['gender', 'weight', 'height'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        document.getElementById('result').classList.remove('show');
    });
});