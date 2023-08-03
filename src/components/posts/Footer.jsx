import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-6 md:mb-0">
            <h1 className="text-xl font-semibold mb-2">Bloger</h1>
            <p className="text-gray-400">Chia sẻ kiến thức và cảm xúc của tôi.</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Liên kết</h2>
            <ul className="space-y-2" style={{marginLeft:"153px"}}>
              <li><a href="#" className="hover:text-gray-400 transition">Trang chủ</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Dịch vụ</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-gray-400 transition">Liên hệ</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Kết nối</h2>
            <div className="flex space-x-4" style={{marginLeft:"155px"}}>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              {/* Thêm các biểu tượng mạng xã hội khác */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-2">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; Bloger của Ho Van Thi.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
