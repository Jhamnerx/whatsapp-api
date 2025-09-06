<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.layout-dashboard','data' => ['title' => 'Phone book']]); ?>
<?php $component->withName('layout-dashboard'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes(['title' => 'Phone book']); ?>
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
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Data Campaign</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page"><?php echo e($campaign_name); ?></li>
                </ol>
            </nav>
        </div>
    </div>
    

    
    <div class="row">
        <div class="col-12 col-lg-12 d-flex">
            <div class="card w-100">
                <div class="card-header py-3">
                    <div class="row g-3">
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>Receiver</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                <?php $__currentLoopData = $blasts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $blast): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <tr>
                                        <td><?php echo e($blast->receiver); ?></td>
                                      
                                       
                                      
                                       
                                        <td>
                                            <?php if($blast->status == 'success'): ?>
                                                <span class="badge rounded-pill bg-success">Sent</span>
                                            <?php elseif($blast->status == 'pending'): ?>
                                                <span class="badge rounded-pill bg-warning">Pending</span>
                                            <?php else: ?>
                                                <span
                                                    class="badge rounded-pill bg-danger"><?php echo e($blast->status); ?></span>
                                            <?php endif; ?>
                                        </td>
                                         <td><?php echo e($blast->updated_at); ?></td>
                                    </tr>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item <?php echo e($blasts->currentPage() == 1 ? 'disabled' : ''); ?>">
                                <a class="page-link" href="<?php echo e($blasts->previousPageUrl()); ?>">Previous</a>
                            </li>

                            <?php for($i = 1; $i <= $blasts->lastPage(); $i++): ?>
                                <li class="page-item <?php echo e($blasts->currentPage() == $i ? 'active' : ''); ?>">
                                    <a class="page-link" href="<?php echo e($blasts->url($i)); ?>"><?php echo e($i); ?></a>
                                </li>
                            <?php endfor; ?>

                            <li
                                class="page-item <?php echo e($blasts->currentPage() == $blasts->lastPage() ? 'disabled' : ''); ?>">
                                <a class="page-link" href="<?php echo e($blasts->nextPageUrl()); ?>">Next</a>
                            </li>
                        </ul>
                    </nav>
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

<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/pages/campaign/datablasts.blade.php ENDPATH**/ ?>