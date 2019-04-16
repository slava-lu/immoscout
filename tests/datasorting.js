const data =
  [
    { id: '107682482', price: '1095000', distance: '4.64' },
    { id: '107682482', price: '1075000', distance: '4.64' },
    { id: '110483764', price: '920000', distance: '5.34' },
    { id: '110483764', price: '900000', distance: '5.34' },
    { id: '110483764', price: '950000', distance: '6.78' },

  ];

const result =
  {
    '107682482':
      [
        { id: '107682482', price: '1095000', distance: '4.64' },
        { id: '107682482', price: '1075000', distance: '4.64' }
      ],
    '110483764':
      [
        { id: '110483764', price: '920000', distance: '5.34' },
        { id: '110483764', price: '900000', distance: '5.34' },
        { id: '110483764', price: '950000', distance: '6.78' }
      ]
  };


const result1 = {};

data.forEach(element => {
  let id = element.id;
  if (!result1[id]) {
    result1[id] = []
  }
  result1[id] = [...result1[id], element]
});

console.log('result', result1);