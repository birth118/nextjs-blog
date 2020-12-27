import { format, parseISO, formatRelative, subDays } from 'date-fns'

const Date = ({ dateString }) => {

  const date = parseISO(dateString)
  return <div>
    <time dateTime={dateString} >
      {format(date, 'LLLL d, yyyy')}
    </time>
  </div>
}

export default Date