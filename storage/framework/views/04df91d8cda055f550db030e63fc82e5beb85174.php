<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.layout-dashboard','data' => ['title' => 'Messages History']]); ?>
<?php $component->withName('layout-dashboard'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes(['title' => 'Messages History']); ?>
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
        <div class="breadcrumb-title pe-3">Messages</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Messages History</li>
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
                                    <th>ID</th>
                                    <th>Sender</th>
                                    <th>Number</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Via</th>
                                    <th>Last Updated</th>
                                    <th>Action </th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                               <?php if($messages->total() == 0): ?>
                                    <?php if (isset($component)) { $__componentOriginal7d2cc6b6ecdefae63f236b635a0696904bd06013 = $component; } ?>
<?php $component = $__env->getContainer()->make(App\View\Components\NoData::class, ['colspan' => '6','text' => 'No Messages History']); ?>
<?php $component->withName('no-data'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal7d2cc6b6ecdefae63f236b635a0696904bd06013)): ?>
<?php $component = $__componentOriginal7d2cc6b6ecdefae63f236b635a0696904bd06013; ?>
<?php unset($__componentOriginal7d2cc6b6ecdefae63f236b635a0696904bd06013); ?>
<?php endif; ?>
                                <?php endif; ?>
                              <?php $__currentLoopData = $messages; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $msg): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                  <tr>
                                    <td><?php echo e($msg->id); ?></td>
                                    <td><?php echo e($msg->device->body); ?></td>
                                    <td><?php echo e($msg->number); ?></td>
                                    <td>
                                        <span class="text-info"><?php echo e($msg->type); ?> </span>: 
                                        <?php echo e(substr($msg->message, 0, 20)); ?> 
                                        <?php echo e(strlen($msg->message) > 20 ? '...' : ''); ?>

                                    <td>
                                        <?php if($msg->status == 'success'): ?>
                                            <span class="badge rounded-pill bg-success">Sent</span>
                                        <?php else: ?> 
                                            <span class="badge rounded-pill bg-danger">Failed</span>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <?php if($msg->send_by == 'web'): ?>
                                            <span class="badge rounded-pill bg-primary">Web</span>
                                        <?php else: ?>
                                            <span class="badge rounded-pill bg-warning">API</span>
                                        <?php endif; ?>
                                    </td>
                                    <td><?php echo e($msg->updated_at->diffForHumans()); ?></td>
                                    <td>
                                       
                                            <a onclick="resend(<?php echo e($msg->id); ?>, '<?php echo e($msg->status); ?>')" class="btn btn-sm btn-primary">
                                                <i class="bx bx-refresh"></i> Resend
                                            </a>
                                        
                                    </td>

                                  </tr>

                              <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                              
                            </tbody>
                        </table>
                    </div>
                   <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item <?php echo e($messages->currentPage() == 1 ? 'disabled' : ''); ?>">
                                <a class="page-link" href="<?php echo e($messages->previousPageUrl()); ?>">Previous</a>
                            </li>

                            <?php for($i = 1; $i <= $messages->lastPage(); $i++): ?>
                                <li class="page-item <?php echo e($messages->currentPage() == $i ? 'active' : ''); ?>">
                                    <a class="page-link" href="<?php echo e($messages->url($i)); ?>"><?php echo e($i); ?></a>
                                </li>
                            <?php endfor; ?>

                            <li
                                class="page-item <?php echo e($messages->currentPage() == $messages->lastPage() ? 'disabled' : ''); ?>">
                                <a class="page-link" href="<?php echo e($messages->nextPageUrl()); ?>">Next</a>
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
<script>
    function resend(id, status) {
       
        if (status == 'success') {
            toastr.info('Message already sent');
            return;
        }

        $.ajax({
            url: '/resend-message',
            type: 'POST',
            data: {
                id: id,
                _token: '<?php echo e(csrf_token()); ?>'
            },
            success: function (res) {
               if(res.error) {
                   toastr.error(res.msg);
                   return;
               } else {
                   toastr.success(res.msg);
                   return;
               }
            },
            error: function (err) {
                toastr.error('Something went wrong');
            }
        });
        
    }
</script>

<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/pages/histories/message.blade.php ENDPATH**/ ?>