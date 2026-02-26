
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var wrapper = document.getElementById('avatar-wrapper');
    var input   = document.getElementById('avatar-input');
    var img     = document.getElementById('avatar-img');
    var KEY     = 'vinh_avatar_dataurl_v3';

    function restore(){ try{ var d=localStorage.getItem(KEY); if(d) img.src=d; }catch(e){} }
    restore();

    if(wrapper && input){
      wrapper.addEventListener('click', function(){ input.click(); });
      input.addEventListener('change', async function(ev){
        const file = ev.target.files && ev.target.files[0];
        if(!file) return;
        if(!file.type.startsWith('image/')){ alert('Vui lòng chọn ảnh (jpg/png/svg).'); return; }
        try{
          const dataUrl = await downscaleImageFile(file, 600);
          img.src = dataUrl;
          try{ localStorage.setItem(KEY, dataUrl); }catch(e){}
        }catch(err){ alert('Không xử lý được ảnh. Vui lòng thử ảnh khác.'); }
      });
    }

    function downscaleImageFile(file, maxDim){
      return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = () => {
          const im = new Image();
          im.onload = () => {
            const scale = Math.min(maxDim/im.width, maxDim/im.height, 1);
            const w = Math.round(im.width*scale), h = Math.round(im.height*scale);
            const canvas = document.createElement('canvas'); canvas.width=w; canvas.height=h;
            const ctx = canvas.getContext('2d'); ctx.drawImage(im,0,0,w,h);
            let out = canvas.toDataURL('image/jpeg', 0.85);
            if(file.type==='image/png' && file.size<1024*1024) out = canvas.toDataURL('image/png');
            resolve(out);
          };
          im.onerror = reject; im.src = reader.result;
        };
        reader.onerror = reject; reader.readAsDataURL(file);
      });
    }

    window.handleSubmit = function(e){ e.preventDefault(); var fd = new FormData(e.target); var s = document.getElementById('form-status'); s.textContent='Đang gửi...'; setTimeout(function(){ s.textContent='Cảm ơn '+(fd.get('name')||'')+'! Mình đã nhận lời nhắn.'; e.target.reset(); }, 600); return false; };
  });
})();
