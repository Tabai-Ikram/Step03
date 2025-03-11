
$(document).ready(function () {
    // عند إرسال النموذج
    $('#bmiForm').submit(function (e) {
        // منع السلوك الافتراضي لإرسال النموذج (إعادة تحميل الصفحة)
        e.preventDefault();

        // التحقق من صحة المدخلات باستخدام jQuery
        var name = $('#name').val().trim(); // الحصول على الاسم وإزالة المسافات الزائدة
        var weight = parseFloat($('#weight').val()); // الحصول على الوزن وتحويله إلى رقم عشري
        var height = parseFloat($('#height').val()); // الحصول على الطول وتحويله إلى رقم عشري

        // التحقق من أن الحقول غير فارغة وأن القيم صحيحة
        if (name === "" || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            // عرض رسالة تحذير إذا كانت القيم غير صحيحة
            $('#result').html('<div class="alert alert-warning">Please enter valid values in all fields.</div>');
            return; // إيقاف التنفيذ
        }

        // إرسال البيانات عبر AJAX
        $.ajax({
            url: 'calculate.php', // الرابط الذي سيتم إرسال البيانات إليه
            type: 'POST', // طريقة الإرسال (POST)
            data: { name: name, weight: weight, height: height }, // البيانات المرسلة
            dataType: 'json', // نوع البيانات المتوقع استقبالها (JSON)
            success: function (response) {
                // إذا كانت العملية ناجحة
                if (response.success) {
                    var alertClass = 'alert-info'; // لون التنبيه الافتراضي

                    // تحديد لون التنبيه بناءً على قيمة الـ BMI
                    if (response.bmi < 18.5) {
                        alertClass = 'alert-warning'; // تنبيه تحذيري
                    } else if (response.bmi < 25) {
                        alertClass = 'alert-success'; // تنبيه نجاح
                    } else if (response.bmi < 30) {
                        alertClass = 'alert-info'; // تنبيه معلوماتي
                    } else {
                        alertClass = 'alert-danger'; // تنبيه خطر
                    }

                    // عرض رسالة النتيجة مع اللون المناسب
                    $('#result').html('<div class="alert ' + alertClass + '">' + response.message + '</div>');
                } else {
                    // إذا كانت العملية غير ناجحة، عرض رسالة خطأ
                    $('#result').html('<div class="alert alert-danger">' + response.message + '</div>');
                }
            },
            error: function () {
                // في حالة حدوث خطأ في الاتصال بالخادم
                $('#result').html('<div class="alert alert-danger">Server error occurred.</div>');
            }
        });
    });
});
