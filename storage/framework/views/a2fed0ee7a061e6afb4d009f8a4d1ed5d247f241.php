<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.layout-dashboard','data' => ['title' => 'Auto Replies']]); ?>
<?php $component->withName('layout-dashboard'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php $component->withAttributes(['title' => 'Auto Replies']); ?>

    
    
    <link href="<?php echo e(asset('css/custom.css')); ?>" rel="stylesheet">


    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Whatsapp</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Auto Reply</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="ms-auto my-4">
        <div class="btn-group">
            <button data-bs-toggle="modal" data-bs-target="#addAutoRespond" type="button" class="btn btn-primary btn-sm">
                <i class="bx bx-plus"></i>New Auto Reply
            </button>

        </div>
    </div>
    <!--end breadcrumb-->
    
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
    <?php if($errors->any()): ?>
        <div class="alert alert-danger">
            <ul>
                <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li><?php echo e($error); ?></li>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </ul>
        </div>
    <?php endif; ?>
    
    <div class="card">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <h5 class="mb-0">Lists auto respond
                    <?php echo e(Session::has('selectedDevice') ? 'for ' . Session::get('selectedDevice')['device_body'] : ''); ?>

                </h5>
                <form class="ms-auto position-relative">
                    <button class="btn  position-absolute top-50 translate-middle-y search-icon px-4"><i
                            class="bi bi-search"></i></button>
                    <input value="<?php echo e(request()->has('keyword') ? request()->get('keyword') : ''); ?>" name="keyword"
                        class="form-control ps-5 px-4" type="text" placeholder="search">

                </form>
            </div>
            <div class="table-responsive mt-3">
                <table class="table align-middle">
                    <thead class="table-secondary">
                        <tr>
                            <th>Keyword</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Quoted</th>
                            <th>Type</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if(Session::has('selectedDevice')): ?>
                            <?php if($autoreplies->total() == 0): ?>
                                <?php if (isset($component)) { $__componentOriginal7d2cc6b6ecdefae63f236b635a0696904bd06013 = $component; } ?>
<?php $component = $__env->getContainer()->make(App\View\Components\NoData::class, ['colspan' => '5','text' => 'No Autoreplies added yet']); ?>
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
                            <?php $__currentLoopData = $autoreplies; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $autoreply): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <tr>


                                    <td>
                                        <input data-url="<?php echo e(route('autoreply.update', $autoreply->id)); ?>"
                                            class="form-control keyword-update" data-id="<?php echo e($autoreply->id); ?>"
                                            type="text" name="id" value="<?php echo e($autoreply->keyword); ?>">
                                    </td>
                                    <td class="py-1">
                                        <p> Will respond if Keyword <span
                                                class="badge bg-success"><?php echo e($autoreply['type_keyword']); ?></span></p>
                                        <p>

                                            & when the sender is <span
                                                class="badge bg-warning"><?php echo e($autoreply['reply_when']); ?></span>
                                        </p>
                                    </td>
                                    <td>
                                        <div class="form-check form-switch">
                                            <input data-url="<?php echo e(route('autoreply.update', $autoreply->id)); ?>"
                                                class="form-check-input toggle-status" type="checkbox"
                                                data-id="<?php echo e($autoreply->id); ?>"
                                                <?php echo e($autoreply->status == 'active' ? 'checked' : ''); ?>>
                                            <label class="form-check-label"
                                                for="toggle-switch"><?php echo e($autoreply->status); ?></label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-check form-switch">
                                            <input data-url="<?php echo e(route('autoreply.update', $autoreply->id)); ?>"
                                                class="form-check-input toggle-quoted" type="checkbox"
                                                data-id="<?php echo e($autoreply->id); ?>"
                                                <?php echo e($autoreply->is_quoted ? 'checked' : ''); ?>>
                                            <label class="form-check-label"
                                                for="toggle-switch"><?php echo e($autoreply->is_quoted ? 'Yes' : 'No'); ?></label>
                                        </div>
                                    </td>
                                    <td><?php echo e($autoreply['type']); ?></td>

                                    <td>
                                        <div class="table-actions d-flex align-items-center gap-3 fs-6">
                                            <a onclick="viewReply(<?php echo e($autoreply->id); ?>)" href="javascript:;"
                                                class="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                title="Views"><i class="bi bi-eye-fill"></i></a>
                                            <form action=<?php echo e(route('autoreply.delete')); ?> method="POST">
                                                <?php echo method_field('delete'); ?>
                                                <?php echo csrf_field(); ?>
                                                <input type="hidden" name="id" value="<?php echo e($autoreply->id); ?>">
                                                <button type="submit" name="delete"
                                                    class="btn text-sm btn-sm text-danger"><i
                                                        class="bi bi-trash-fill"></i></button>
                                            </form>
                                        </div>

                                    </td>
                                </tr>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="4">Please select device</td>
                            </tr>
                        <?php endif; ?>

                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item <?php echo e($autoreplies->currentPage() == 1 ? 'disabled' : ''); ?>">
                        <a class="page-link" href="<?php echo e($autoreplies->previousPageUrl()); ?>">Previous</a>
                    </li>

                    <?php for($i = 1; $i <= $autoreplies->lastPage(); $i++): ?>
                        <li class="page-item <?php echo e($autoreplies->currentPage() == $i ? 'active' : ''); ?>">
                            <a class="page-link" href="<?php echo e($autoreplies->url($i)); ?>"><?php echo e($i); ?></a>
                        </li>
                    <?php endfor; ?>

                    <li
                        class="page-item <?php echo e($autoreplies->currentPage() == $autoreplies->lastPage() ? 'disabled' : ''); ?>">
                        <a class="page-link" href="<?php echo e($autoreplies->nextPageUrl()); ?>">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>







    <!-- Modal -->
    <div class="modal fade" id="addAutoRespond" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Auto Reply</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="POST" enctype="multipart/form-data" id="formautoreply">
                        <?php echo csrf_field(); ?>
                        <label for="device" class="form-label">Whatsapp Account</label>
                        <?php if(Session::has('selectedDevice')): ?>
                            
                            <input type="hidden" name="device"
                                value="<?php echo e(Session::get('selectedDevice')['device_id']); ?>">
                            
                            <input type="text" name="device_body" id="device" class="form-control"
                                value="<?php echo e(Session::get('selectedDevice')['device_body']); ?>" readonly>
                        <?php else: ?>
                            <input type="text" name="devicee" id="device" class="form-control"
                                value="Please select device" readonly>
                        <?php endif; ?>

                        <div class="form-group">
                            <label for="keyword" class="form-label">Type Keyword</label><br>
                            <input type="radio" value="Equal" name="type_keyword" checked class="mr-2"><label
                                class="form-label">Equal</label>
                            <input type="radio" value="Contain" name="type_keyword"><label
                                class="form-label">Contains</label>
                        </div>
                        <div class="form-group">
                            <label for="keyword" class="form-label">Only reply when sender is </label><br>
                            <input type="radio" value="Group" name="reply_when" class="mr-2"><label
                                class="form-label">Group</label>
                            <input type="radio" value="Personal" name="reply_when"><label
                                class="form-label">Personal</label>
                            <input type="radio" value="All" checked name="reply_when"><label
                                class="form-label">All</label>
                        </div>
                        <label for="keyword" class="form-label">Keyword</label>
                        <input type="text" name="keyword" class="form-control" id="keyword" required>
                        <label for="type" class="form-label">Type Reply</label>
                        <select name="type" id="type" class="js-states form-control" tabindex="-1"
                            required>
                            <option selected disabled>Select One</option>
                            <option value="text">Text Message</option>
                            <option value="image">Image Message</option>
                            <option value="button">Button Message</option>
                            <option value="template">Template Message</option>
                            <option value="list">List Message</option>

                        </select>
                        <div class="ajaxplace"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" name="submit" class="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Auto Reply Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body showReply">
                </div>
            </div>
        </div>
    </div>
    <!--  -->
    
    
    <script src="<?php echo e(asset('plugins/datatables/datatables.min.js')); ?>"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>

    <script src="<?php echo e(asset('js/autoreply.js')); ?>"></script>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
<?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
<?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
<?php endif; ?>
<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/pages/autoreply.blade.php ENDPATH**/ ?>