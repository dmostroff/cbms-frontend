<template>
    <v-layout class="mr-1">
        <v-flex>
            <span v-if="isReadOnly">View</span>
            <span v-if="itemId>0">Edit </span>
            <span v-else>Add </span>
            {{ cardTitle }}
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex align-self-end class="subtitle-2">{{ clientPerson.client_name }} <span class="caption"> {{ clientPerson.id }}</span></v-flex>
        <v-flex class="subtitle-2">{{ clientPerson.client_code }}</v-flex>
    </v-layout>

</template>

<script>

export default {
    name: "ClientCardTitle",
    components: {},
    props: {
        clientPerson: Object,
        cardTitle: String,
        isReadOnly: {
            type: Boolean,
            default: false,
        },
        itemId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {}
};
</script>
<style scoped>

</style>