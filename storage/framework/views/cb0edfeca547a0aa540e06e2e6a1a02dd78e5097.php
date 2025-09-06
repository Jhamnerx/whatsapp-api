<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.layout-dashboard','data' => ['title' => 'Rest Api']]); ?>
<?php $component->withName('layout-dashboard'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes(['title' => 'Rest Api']); ?>
    <div class="app-content">
        <div class="content-wrapper">
            <div class="container">



                <!--breadcrumb-->
                <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div class="breadcrumb-title pe-3">User</div>
                    <div class="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0 p-0">
                                <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Settings</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <!--end breadcrumb-->

                <div class="row">
                    <?php if(session()->has('alert')): ?>
                        <?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.alert','data' => []]); ?>
<?php $component->withName('alert'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes([]); ?>
                            <?php $__env->slot('type', session('alert')['type']); ?>
                            <?php $__env->slot('msg', session('alert')['msg']); ?>
                         <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
<?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
<?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
<?php endif; ?>
                    <?php endif; ?>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="">Settings</h5>
                            <div class="row col-md-6 mx-auto">
                                <div class="col-md-12">
                                    <form action="<?php echo e(route('generateNewApiKey')); ?>" method="POST">
                                        <?php echo csrf_field(); ?>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text" id="basic-addon1">API Key</span>

                                            <input type="text" class="form-control"
                                                value="<?php echo e(Auth::user()->api_key); ?>" aria-label="Username"
                                                aria-describedby="basic-addon1" readonly>
                                            <button type="submit" name="api_key" class="btn btn-primary">Generate
                                                New</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div class="row mt-4">
                                <div class="col-md-6 mx-auto">

                                    <form action="<?php echo e(route('changePassword')); ?>" method="POST">
                                        <?php echo csrf_field(); ?>

                                        <div class="form-group">
                                            <label for="settingsCurrentPassword" class="form-label">Current
                                                Password</label>
                                            <input type="password" name="current"
                                                class="form-control <?php echo e($errors->has('current') ? 'is-invalid' : ''); ?> "
                                                aria-describedby="settingsCurrentPassword"
                                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                                            <?php if($errors->has('current')): ?>
                                                <div class="invalid-feedback">
                                                    <?php echo e($errors->first('current')); ?>

                                                </div>
                                            <?php endif; ?>


                                        </div>

                                        <div class="col-md-12">
                                            <label for="password" class="form-label">New Password</label>
                                            <input type="password" name="password"
                                                class="form-control <?php echo e($errors->has('password') ? 'is-invalid' : ''); ?>"
                                                aria-describedby="password"
                                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                                            <?php if($errors->has('password')): ?>
                                                <div class="invalid-feedback">
                                                    <?php echo e($errors->first('password')); ?>

                                                </div>
                                            <?php endif; ?>
                                        </div>

                                        <div class="col-md-12">
                                            <label for="settingsConfirmPassword" class="form-label">Confirm
                                                Password</label>
                                            <input type="password" name="password_confirmation" class="form-control"
                                                aria-describedby="settingsConfirmPassword"
                                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
                                        </div>

                                        <div class="row m-t-lg mt-4">
                                            <div class="col mt-2">

                                                <button type="submit" class="btn btn-info text-white m-t-sm">Change
                                                    Password</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
<?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
<?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
<?php endif; ?>
<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/pages/user/settings.blade.php ENDPATH**/ ?>