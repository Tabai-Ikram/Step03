
<?php
// تعيين نوع المحتوى كـ JSON
header('Content-Type: application/json');

// التحقق من وجود البيانات المرسلة عبر POST
if (isset($_POST['name'], $_POST['weight'], $_POST['height'])) {
    // تنظيف المدخلات وتأمينها
    $name = htmlspecialchars($_POST['name']); // تحويل الأحخاص الخاصة إلى كيانات HTML
    $weight = floatval($_POST['weight']); // تحويل الوزن إلى رقم عشري
    $height = floatval($_POST['height']); // تحويل الطول إلى رقم عشري

    // التحقق من أن الوزن والطول قيم صحيحة (أكبر من الصفر)
    if ($weight <= 0 || $height <= 0) {
        // إرجاع رسالة خطأ إذا كانت القيم غير صحيحة
        echo json_encode([
            'success' => false,
            'message' => 'Invalid input values. Weight and height must be greater than zero.'
        ]);
        exit; // إنهاء البرنامج
    }

    // حساب مؤشر كتلة الجسم (BMI)
    $bmi = $weight / ($height * $height);

    // تحديد التفسير بناءً على قيمة الـ BMI
    if ($bmi < 18.5) {
        $interpretation = "Underweight"; // نقص الوزن
    } elseif ($bmi < 25) {
        $interpretation = "Normal weight"; // وزن طبيعي
    } elseif ($bmi < 30) {
        $interpretation = "Overweight"; // زيادة الوزن
    } else {
        $interpretation = "Obesity"; // سمنة
    }

    // إنشاء رسالة النتيجة
    $message = "Hello, $name. Your BMI is " . number_format($bmi, 2) . " ($interpretation).";

    // إرجاع النتيجة كـ JSON
    echo json_encode([
        'success' => true,
        'bmi' => $bmi,
        'message' => $message
    ]);
    exit; // إنهاء البرنامج
}

// إذا لم يتم استلام البيانات المطلوبة
echo json_encode([
    'success' => false,
    'message' => 'Data not received.'
]);
exit; // إنهاء البرنامج
?>
