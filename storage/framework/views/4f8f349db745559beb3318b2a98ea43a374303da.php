<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.layout-dashboard','data' => ['title' => 'API Docs']]); ?>
<?php $component->withName('layout-dashboard'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes(['title' => 'API Docs']); ?>

    
    

    <style>
        .tab-content {
            margin-top: 20px;
        }

        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            background-color: #fff;
            color: #333;
        }
    </style>

    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">API</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Documentation</li>
                </ol>
            </nav>
        </div>
    </div>
    <!--end breadcrumb-->

    
    <div class="container-fluid">
        <div class="row flex-wrap">
            <div class="col-lg-3 mb-4">
                <ul class="nav nav-tabs flex-column w-100 mt-4 " role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#sendmessage" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Send Message</div>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#sendmedia" role="tab" aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Send Media</div>
                            </div>
                        </a>
                    </li>
                    
                    <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#sendbutton" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Send Button</div>
                            </div>
                        </a>
                    </li>
                    
                    <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#sendtemplate" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Send Template Button</div>
                            </div>
                        </a>
                    </li>
                    
                     <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#sendlist" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                            
                                <div class="tab-title">Send List Message</div>
                            </div>
                        </a>
                    </li>
                    
                       <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#responses" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class='fa fa-reply'></i></div>
                                <div class="tab-title">Responses </div>
                            </div>
                        </a>
                    </li>
                    
                     <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#generateqr" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class='fa fa-reply'></i></div>
                                <div class="tab-title">Generate QR Code </div>
                            </div>
                        </a>
                    </li>
                    
                     <li class="nav-item" role="presentation">
                        <a class="nav-link " data-bs-toggle="tab" href="#examplewebhook" role="tab"
                            aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-icon"><i class='fa fa-reply'></i></div>
                                <div class="tab-title">Example Webhook </div>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
            <div class="col-lg-9 mb-4">
                <div class="tab-content pt-4 w-100">
                    
                    <?php echo $__env->make('pages.api-docs.send-message', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.send-media', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.send-button', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.send-template', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.send-list', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.responses', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.generateqr', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                    <?php echo $__env->make('pages.api-docs.examplewebhook', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    
                    
                </div>






 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
<?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
<?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
<?php endif; ?>
<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/pages/api-docs/index.blade.php ENDPATH**/ ?>