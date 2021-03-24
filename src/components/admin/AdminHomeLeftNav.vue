<template>
    <menu-display :menuItems="menuItems"></menu-display>
</template>
<script>
import MenuDisplay from '@/components/common/MenuDisplay';

export default{
    name: "AdminHomeLeftNav",
    components: {
        MenuDisplay
    },
    data: () => ({
      menuItems: [
        {
          prompt: "Users",
          link: { name: "authUsers" },
        },
        {
          prompt: "Settings",
          link: { name: "AdmSettingHome" },
        },
        {
          prompt: "CC Companies",
          link: { name: "ccCompanies" },
        },
        {
          prompt: "CC Cards",
          link: { name: "ccCards" },
        },
      ],
    }),
}
</script>