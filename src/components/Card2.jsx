import React from 'react';

const Card = () => {
  return (
    <div className="relative flex justify-center h-[300px] w-[160px] border border-4 border-black rounded-2xl bg-gray-50" style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1712844228387-227d61f358ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc2hpb24lMjB2aW50YWdlfGVufDB8fDB8fHww')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
      <span className="border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl" />
      <span className="absolute -right-2 top-14 border border-4 border-black h-7 rounded-md" />
      <span className="absolute -right-2 bottom-36 border border-4 border-black h-10 rounded-md" />
    </div>
  );
}

export default Card;
