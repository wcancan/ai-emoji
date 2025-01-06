<template>
    <div>
        <div class="cropper-container"></div>
    </div>
</template>

<style lang="scss" scoped>
.cropper-container {
//   border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1.25rem 1.5rem;

  :deep(cropper-canvas) {
    height: 360px;
  }
}
</style>

<script setup>
    import { ref, onMounted } from "vue";
    import Cropper from 'cropperjs';
    // const props = defineProps(['foo']) || 
    // console.log(props.foo)
    onMounted(() => {
        console.log(`the component is now mounted.`)
        const cropperImg = 'https://iknow-pic.cdn.bcebos.com/f11f3a292df5e0fe8201d79f4e6034a85edf7216'
        const image = new Image();

        image.src = cropperImg;
        image.alt = 'Picture';
        
        const cropper = new Cropper(image, {
            container: '.cropper-container',
        });
    })
    
</script>
