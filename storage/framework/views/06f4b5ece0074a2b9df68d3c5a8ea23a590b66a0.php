 <?php if($contacts->total() == 0): ?>
     <div class="d-flex justify-content-center align-items-center">

         <?php if (isset($component)) { $__componentOriginal7d2cc6b6ecdefae63f236b635a0696904bd06013 = $component; } ?>
<?php $component = $__env->getContainer()->make(App\View\Components\NoData::class, []); ?>
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
     </div>
 <?php endif; ?>

 <div href="app-emailread.html " style="width: 100%;" <div class="d-md-flex align-items-center email-message px-3 py-1">
     <div class="d-flex align-items-center email-actions">
         <p class="mb-0"><b>Name</b>
         </p>
     </div>
     <div class="">
         <p class="mb-0"><b>Number Whatsapp </b></p>
     </div>


 </div>
 <?php $__currentLoopData = $contacts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $contact): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
     <div href="app-emailread.html " id="contact-<?php echo e($contact->id); ?>" style="width: 100%;" <div
         class="d-md-flex align-items-center email-message px-3 py-1">
         <div class="d-flex align-items-center email-actions">
             <p class="mb-0"><b><?php echo e($contact->name); ?></b>
             </p>
         </div>
         <div class="">
             <p class="mb-0"><b><?php echo e($contact->number); ?> </b></p>
         </div>
         <button onclick="deleteContact(<?php echo e($contact->id); ?>)" class="btn btn-sm text-danger">
             <i class="bi bi-trash"></i>
         </button>

     </div>
     </div>
 <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
<?php /**PATH /home/topupgtc/wapi.topupgt.com/resources/views/pages/phonebook/datacontact.blade.php ENDPATH**/ ?>