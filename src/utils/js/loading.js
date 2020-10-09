/**
 * Created by licheng on 18/5/24.
 */
/**
 * 脚本名称：页面加载Loading脚本
 * 脚本说明：
 * 1.因为使用到document.body.scrollHeight对象，脚本引入时，脚本应放到body内，否则报错；
 * 2.loadingImage为loading的图片，您可以替换为您想要的图片(base64格式)；loading弹窗的样式可以通过代码修改；
 * 3.使用方法：弹出遮罩：load.loading.add("加载中，请稍候", 1);扔掉遮罩： load.loading.remove();
 */

(function (global, factory) {
    //For CommonJS and CommonJS-like
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "previewImage requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
})(typeof window !== "undefined" ? window : this, function(window) {

    var load = window.whir || {};
    load.loading =
    {
        //type 1-加载 2-成功 3-失败
        add: function (title) {
            var mask = document.getElementById('loading-mask');
            if (!mask) {
                var arr = this.getPageSize();
                var width = parseInt(arr[2]);
                var height = parseInt(arr[3]);

                //背景遮罩
                var mask = document.createElement("div");
                mask.id = 'loading-mask';
                mask.style.position = 'fixed';
                mask.style.left = '0';
                mask.style.top = '0';
                mask.style.width = '100%';
                mask.style.height = height + "px";
                mask.style.background = "rgba(0,0,0,0.5)";
                mask.style.zIndex = "10000";
                mask.addEventListener('touchstart', function (e) { e.preventDefault(); }, false);   //触摸事件
                mask.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);    //滑动事件
                mask.addEventListener('touchend', function (e) { e.preventDefault(); }, false);         //离开元素事件
                document.body.appendChild(mask);

                //提示文本
                var loading = document.createElement("div");
                loading.id = 'loading';
                loading.style.position = 'absolute';
                loading.style.left = ((width-90) / 2) + "px";
                loading.style.top = ((height-90) / 2) + "px";
                loading.style.width = '90px';
                loading.style.height = "90px";

                loading.style.fontFamily = " initial";
                loading.style.zIndex = "100001";
                loading.style.background = "rgba(0,0,0,0.6)";
                loading.style.borderRadius = "5px";
                loading.style.textAlign = "center";
                //loading.innerHTML = title;

                var img = document.createElement('img');
                img.id = 'loading-img';
                img.style.width = "30px";
                img.style.height = "30px";
                img.style.display = 'block';
                img.style.margin = '15px 30px 10px 30px';

                var titleDiv = document.createElement('div');
                titleDiv.id = 'loading-title';
                titleDiv.style.color = "#fff";
                titleDiv.style.fontSize = "12px";

                loading.appendChild(img);
                loading.appendChild(titleDiv);

                mask.appendChild(loading);
            }

            img.src = 'data:image/gif;base64,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';

            var titleDiv = document.getElementById('loading-title');
            title = (title != undefined && title.length > 0) ? title : "加载中...";
            titleDiv.innerHTML = title;
        },

        showSuccess : function (title) {
            var element = document.getElementById("loading-mask");
            if (!element) {
                this.add();
            }

            document.getElementById("loading-img").src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAA5pmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0xMi0yMlQxNjo0MjoyMCswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTEyLTIyVDE2OjQyOjQ4KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMi0yMlQxNjo0Mjo0OCswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxMTBjYzc3YS03OWU2LTQ5MDctOGQwMi03YTEzYTE0NTliYzA8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6RUY0NUIwRjI5QUU2MTFFNEFGQTRGQzdFQjY4QTI4NDU8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6RUY0NUIwRUY5QUU2MTFFNEFGQTRGQzdFQjY4QTI4NDU8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6RUY0NUIwRjA5QUU2MTFFNEFGQTRGQzdFQjY4QTI4NDU8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpFRjQ1QjBGMjlBRTYxMUU0QUZBNEZDN0VCNjhBMjg0NTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MTEwY2M3N2EtNzllNi00OTA3LThkMDItN2ExM2ExNDU5YmMwPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIyVDE2OjQyOjQ4KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj45MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj45MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+zWpBPwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAI5klEQVR42uydeYwURRSHvz3EY1kUYfHmcjk0KkPWiwHPMTERxYsggoL3BXgl3gEEEQMab0GiwROPVRBBjUfWGCODxIMRElhQZMWICoK6QEhgD/+ot9pbU8McXd0zPfYvmT96erb71Tc1Xe+9elVb0traSijvVRoiCEGHoEOFoEPQIehQIegQdKgQdKGq3O0FInVRL+yqAk4Ajgb6yuswoAtQKXY3AduALcAvwFp5rQK+Ajb7ATARi/sD2pJKgEHAcOBsAZyJ7Z3lVQ2cpp1fBXwEzAfiQGuge7RL9QSuAC4DjrR87aPldRuwDngVeBFo+D89o/tJo78HJnsAWdeRcp/v5b79ir1HdwemA5em+ZJbgJXAUmANUA+sB/4AGoHdwF5AJ6Ar0AvoLwAHAcemuH45MBa4HHgduBfYUEygy+UnPAXYN8VnGoF3gUXAZwJ1T9otA+EW+TI+dJzrApwBDAPOly9E/yWPBi4C7gcelcE10I+OamAJMDMF5JXA1cChwBjg7Qwgp9MWuc4Yue7Vch9d+wIzZLCsDjLoi4FvgRNNnhFwHjAAmAvs8MiG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';
            document.getElementById("loading-title").innerHTML = title;

            setTimeout(function () {
                load.loading.remove();
            },1000);
        },
        showError : function (title) {
            var element = document.getElementById("loading-mask");
            if (!element) {
                //console.log("加一个")
                this.add();
            }

            document.getElementById("loading-img").src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENUY2QkU3MzlBRTYxMUU0OEI3RENCRTRFRUE2NTJFOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENUY2QkU3NDlBRTYxMUU0OEI3RENCRTRFRUE2NTJFOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1RjZCRTcxOUFFNjExRTQ4QjdEQ0JFNEVFQTY1MkU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ1RjZCRTcyOUFFNjExRTQ4QjdEQ0JFNEVFQTY1MkU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3rKlWgAABptJREFUeNrsXWtsFFUU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';
            document.getElementById("loading-title").innerHTML = title;
            setTimeout(function () {
                load.loading.remove();
            },1000);
        },
        remove: function () {
            //console.log("loading remove");
            $("#loading").fadeOut(250);
            $("#loading-mask").fadeOut(250, function () {
                var element = document.getElementById("loading-mask");
                if (element) {
                    element.parentNode.removeChild(element);
                }
                element = document.getElementById("loading");
                if (element) {
                    element.parentNode.removeChild(element);
                }
            });
        },
        getPageSize: function () {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY) {
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else {
                if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
                    xScroll = document.body.scrollWidth;
                    yScroll = document.body.scrollHeight;
                } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                    xScroll = document.body.offsetWidth;
                    yScroll = document.body.offsetHeight;
                }
            }
            var windowWidth = 0;
            var windowHeight = 0;
            var pageHeight = 0;
            var pageWidth = 0;

            if (self.innerHeight) { // all except Explorer
                if (document.documentElement.clientWidth) {
                    windowWidth = document.documentElement.clientWidth;
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else {
                if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                    windowWidth = document.documentElement.clientWidth;
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    if (document.body) { // other Explorers
                        windowWidth = document.body.clientWidth;
                        windowHeight = document.body.clientHeight;
                    }
                }
            }
            // for small pages with total height less then height of the viewport

            if (yScroll < windowHeight) {
                pageHeight = windowHeight;
            } else {
                pageHeight = yScroll;
            }
            // for small pages with total width less then width of the viewport
            if (xScroll < windowWidth) {
                pageWidth = xScroll;
            } else {
                pageWidth = windowWidth;
            }
            var arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
            return arrayPageSize;
        }
    };

    window.load = load;
    // AMD loader
    if ( typeof define === "function" && define.amd ) {
        define([], function() {
            return load;
        } );
    }

    return load;

})