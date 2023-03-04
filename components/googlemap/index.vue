<template>
  <v-card flat outlined class="ma-5 pa-5">
    <v-card-title class="font-weight-bold text-h5">
      GoogleMapを表示しよう！
    </v-card-title>
    <!-- <GmapMap
      ref="gmap"
      map-type-id="roadmap"
      :center="{ lat: lat, lng: lng }"
      :zoom="zoom"
      :style="styleMap"
      :options="mapOptions"
    >
      <GmapMarker
        ref="gmarker"
        title="あなたの医院"
        :position="{ lat: markerLat, lng: markerLng }"
        :clickable="false"
        :draggable="true"
        @dragend="updateMarker"
      />
    </GmapMap> -->
  </v-card>
</template>
<script>
export default {
  // data: () => ({
  //   lat: 35.681158293,
  //   lng: 139.766561699,
  //   markerLat: 35.681158293,
  //   markerLng: 139.766561699,
  //   zoom: 15,
  //   // GoogleMapsのメタデータ
  //   styleMap: {
  //     width: 'auto',
  //     height: '400px'
  //   },
  //   mapOptions: {
  //     streetViewControl: false,
  //     styles: []
  //   }
  // }),
  // mounted() {
  //   // googleMapを操作時の拡大率と中心座標の更新
  //   const google = (window.google = window.google ? window.google : {})
  //   const that = this
  //   if (this.$refs.gmap !== undefined) {
  //     this.$refs.gmap.$mapPromise
  //       .then((map) => {
  //         google.maps.event.addListener(
  //           this.$refs.gmap.$mapObject,
  //           'zoom_changed',
  //           function () {
  //             that.zoom = map.zoom
  //           }
  //         )
  //         google.maps.event.addListener(
  //           this.$refs.gmap.$mapObject,
  //           'idle',
  //           function () {
  //             that.lat = map.getCenter().lat()
  //             that.lng = map.getCenter().lng()
  //           }
  //         )
  //         // action button 追加
  //         this.control(google)
  //       })
  //       .catch((e) => {
  //         console.log(e)
  //       })
  //   }
  // },
  // methods: {
  //   // GoogleMapのマーカーがドラッグで移動された時の座標更新
  //   updateMarker(location) {
  //     this.markerLng = location.latLng.lng()
  //     this.markerLat = location.latLng.lat()
  //   },
  //   control(google) {
  //     const frame = document.createElement('div')
  //     const button = document.createElement('div')
  //     button.style.backgroundColor = '#ffffff'
  //     button.style.padding = '0px 16px'
  //     button.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px'
  //     button.style.cursor = 'pointer'
  //     button.style.height = '40px'
  //     button.style.borderRadius = '2px'
  //     button.style.verticalAlign = 'middle'
  //     button.style.display = 'table-cell'
  //     button.style.color = '#262626'
  //     button.style.fontFamily = 'Roboto, Arial, sans-serif'
  //     button.style.fontSize = '18px'
  //     button.style.textAlign = 'center'
  //     button.title = 'カスタムコントロール'
  //     button.innerHTML = 'カスタムコントロール'
  //     frame.index = 1
  //     frame.style.margin = '10px'
  //     frame.appendChild(button)
  //     google.maps.event.addDomListener(button, 'click', function () {
  //       console.log('press button!!')
  //     })
  //     this.$refs.gmap.$mapObject.controls[
  //       google.maps.ControlPosition.LEFT_BOTTOM
  //     ].push(frame)
  //   }
  // }
}
</script>
