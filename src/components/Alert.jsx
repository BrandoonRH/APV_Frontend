

function Alert({alert}) {
  return (
    <div className={`${alert.error ? 'from-red-300 to-red-600' : 'from-indigo-300 to-indigo-600'} 
       bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10 `}>
        {alert.message}
    </div>
  )
}

export default Alert