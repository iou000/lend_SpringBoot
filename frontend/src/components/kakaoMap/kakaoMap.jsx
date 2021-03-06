/*global kakao*/
import React, {useEffect} from 'react';

const KakaoMap = ({getTextValue}) => {

    useEffect(() => {
        var container = document.getElementById('map'); // 지도를 표시할 div설정
        var options = {
            center: new kakao
                .maps
                .LatLng(37.21005045588719, 126.97523922923904),
            level: 4 // 지도 확대 레벨
        };
        // 지도 생성
        var map = new kakao.maps.Map(container, options);
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
            infowindow = new kakao.maps.InfoWindow({zindex: 1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        
                        var detailAddr = '<div>' + result[0].address.address_name + '</div>';

                        var content = detailAddr + '</div>';
                        //console.log(result[0].address.address_name); // 주소 텍스트 출력
                        // console.log(result[0].address);
                        // 마커를 클릭한 위치에 표시합니다
                        marker.setPosition(mouseEvent.latLng);
                        marker.setMap(map);
                        

                        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                        
                        //주소 입력하는 input에 클릭한 위치 정보 표시
                        document.getElementById('addressInput').value = `${result[0].address.address_name}`

                        getTextValue(result[0].address.address_name);
                        // props.handleChange(result[0].address.address_name);
                        
                        
                    }
                });
            });
            
            

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', function () {
                searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            });

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var infoDiv = document.getElementById('centerAddr');

                for (var i = 0; i < result.length; i++) {
                    if (result[i].region_type === '') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }
        }

    }, [])

    return (
        <div>
            <input id="addressInput" type="text" placeholder="주소를 입력하세요"
            style={{
                width: "342px",
                height: "30px",
                margin: "0 auto",
                padding: "3px",
                outline: "none",
                border: "1px solid skyblue",
            }}></input>
            <div
                id="map"
                style={{
                    width: "350px",
                    height: "300px",
                    borderRadius: "5px",
                    margin: "2px auto",
                }}></div>
        </div>
    )
}

export default KakaoMap;

/* geocoder.addressSearch('경기도 군포시', function(result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">내 주소 설정!</div>'
                });
                infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });     */