import { Button } from '@radix-ui/themes'

const IssueDeleteButton = ({issueId} : {issueId : string}) => {
  return (
    <Button color='red'>
      Delete
    </Button>
  )
}

export default IssueDeleteButton