<div class="back-drop">
  <slot><!-- optional fallback --></slot>
</div>

<style>
  .back-drop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
