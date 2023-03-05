<script setup lang="ts">
import { GoogleMap, Marker, CustomControl } from 'vue3-google-map'
const config = useRuntimeConfig()
const googleMap = ref<any>(null)
const mapZoom = ref<number>(15)
const mapPosition = ref<{ lat: number; lng: number }>({
  lat: 35.681158293,
  lng: 139.766561699
})
const markerPosition = ref<{ lat: number; lng: number }>({
  lat: 35.681158293,
  lng: 139.766561699
})
const options = {
  style: {
    width: 'auto',
    height: '400px'
  },
  options: {
    streetViewControl: false,
    styles: []
  }
}
const markeroptions = {
  clickable: false,
  draggable: true
}
const updateMap = () => {
  mapPosition.value = {
    lat: googleMap.value.map.center.lat(),
    lng: googleMap.value.map.center.lng()
  }
  mapZoom.value = googleMap.value.map.zoom
}
const updateMarker = (e: any) => {
  markerPosition.value = { lat: e.latLng.lat(), lng: e.latLng.lng() }
}
</script>
<template>
  <v-card flat outlined class="ma-5 pa-5">
    <v-card-title class="font-weight-bold text-h5">
      GoogleMapを表示しよう！
    </v-card-title>
    <GoogleMap
      ref="googleMap"
      :center="mapPosition"
      :api-key="config.public.GOOGLE_MAPS_JS_API_KEY"
      :zoom="mapZoom"
      v-bind="options"
      @dragend="updateMap()"
      @zoom_changed="updateMap()"
    >
      <Marker
        :options="{ position: markerPosition, ...markeroptions }"
        @dragend="updateMarker($event)"
      />
      <CustomControl position="LEFT_BOTTOM">
        <button
          class="height-40 ma-3 px-4 bg-white cursor-pointer rounded-sm text-h6 text-center d-table-cell"
          :style="{
            'box-shadow': 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
            'vertical-align': 'middle'
          }"
        >
          カスタムコントロール
        </button>
      </CustomControl>
    </GoogleMap>
    <p class="mt-3">地図の中心座標：{{ mapPosition }}</p>
    <p>地図の拡大率：{{ mapZoom }}</p>
    <p>マーカーの座標：{{ markerPosition }}</p>
  </v-card>
</template>
