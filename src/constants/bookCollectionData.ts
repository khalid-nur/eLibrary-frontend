export const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const defaultSlidesImages = [
  "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9780062910691&content=M&Return=1&Type=M",
  "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9781250799050&content=M&Return=1&Type=M",
  "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9781982175375&content=M&Return=1&Type=M",
  "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9780525521143&content=M&Return=1&Type=M",
  "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9780156027328&content=M&Return=1&Type=M",
  "https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=GWH11030&password=CC64392&Value=9781668045770&content=M&Return=1&Type=M",
];
