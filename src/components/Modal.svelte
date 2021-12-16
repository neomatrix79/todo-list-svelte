<script>
  import { createEventDispatcher } from "svelte";
  import BackDrop from "../common/BackDrop.svelte";
  import Button from "../common/Button.svelte";

  export let show = false;
  export let content = "content";

  const dispatch = createEventDispatcher();

  const onCancel = () => {
    show = false;
    // dispatch("cancel");
  };

  const onRemove = () => {
    show = false;
    dispatch("remove");
  };
</script>

{#if show}
  <!-- content here -->
  <BackDrop>
    <div class="modal">
      <div class="title">확인</div>
      <div class="content">{content}</div>
      <div class="button-area">
        <Button blue on:click={onCancel}>취소</Button>
        <Button red on:click={onRemove}>삭제</Button>
      </div>
    </div>
  </BackDrop>
{/if}

<style>
  .modal {
    width: 300px;
    /* height: 500px; */
    border-radius: 0.25rem;
    padding: 1rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
  }

  .title {
    font-size: 2rem;
    font-weight: 700;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    color: #3a64cc;
    letter-spacing: 0.25rem;
  }

  .content {
    width: 100%;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: left;
  }

  .button-area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.25rem;
    width: 100%;
  }
</style>
