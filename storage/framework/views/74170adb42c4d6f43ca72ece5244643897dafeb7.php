<head>
   
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="WABOT is Whatsapp Multi Device API gateway service for sending and receiving messages, notification, scheduler, reminder, tracking and store platform for your business">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>" />
    <meta name="keywords"
        content="waapi,wa gateway, whatsapp blast, whatsapp api gateway, whatsapp business, ">
    <meta name="author" content="WABOT">
    <!-- The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title -->
    <title><?php echo e($title); ?> | Whatsapp API Gateway</title>

    <!-- Styles -->
    <link href="<?php echo e(asset('assets/css/bootstrap.min.css')); ?>" rel="stylesheet" />
    <link href="<?php echo e(asset('assets/css/bootstrap-extended.css')); ?>" rel="stylesheet" />
    <link href="<?php echo e(asset('assets/css/style.css')); ?>" rel="stylesheet" />
    <link href="<?php echo e(asset('assets/css/icons.css')); ?>" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <script src="<?php echo e(asset('assets/js/jquery.min.js')); ?>"></script>




</head>

<body class="bg-login">
    <div class="wrapper">

        <?php echo e($slot); ?>

    </div>

</body>

<script src="<?php echo e(asset('assets/js/pace.min.js')); ?>"></script>
</body>

</html>
<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/components/layout-auth.blade.php ENDPATH**/ ?>