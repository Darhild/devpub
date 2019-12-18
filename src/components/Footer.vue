<template>
  <div class="Footer">
    <div class="Footer-Links">
      <router-link class="Link Footer-Item" to="/">
        Главная
      </router-link>
      <router-link class="Link Footer-Item" to="/calendar">
        Календарь
      </router-link>
      <router-link class="Link Footer-Item" to="/stat">
        Статистика
      </router-link>
    </div>
    <div class="Footer-Info">
      <div class="Footer-Item">
        <a href="tel:+79039566655" class="Link">+7 903 956-66-55</a>
      </div>
      <div class="Footer-Item">
        <a href="mailto:dmitry@kondratiev.com" class="Link"
          >dmitry@kondratiev.com</a
        >
      </div>
      <div class="Footer-Item">
        (c) Дмитрий Кондратьев, 2010-2019
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 13px 30px 30px 68px;
  border-top: 1px solid var(--color-layout-primary);

  @media (max-width: $screen-tablet) {
    flex-direction: column;
    align-items: center;
  }

  &-Item {
    display: block;
    margin-bottom: 16px;
    font-size: 1.4rem;
    line-height: 1.2;
    color: var(--color-black);

    @media (max-width: $screen-tablet) {
      margin-right: 15px;
      margin-bottom: 10px;
      text-align: center;

      &:last-child {
        margin-right: 0;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Links {
    @media (max-width: $screen-tablet) {
      display: flex;
      margin-bottom: 10px;
    }
  }
}
</style>
