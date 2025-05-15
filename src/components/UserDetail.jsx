function UserDetail ({ icon, label, content, href }) {
  return (
    <>
      <dd aria-label={label} className={!content ? 'no-info' : ''}>
        {icon}
      </dd>
      <dt className={!content ? 'no-info' : ''}>
        {content ? (
          href ? (
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {content}
            </a>
          ) : (
            <p>{content}</p>
          )
        ) : (
          <p>Not Available</p>
        )}
      </dt>
    </>
  )
}
export default UserDetail
