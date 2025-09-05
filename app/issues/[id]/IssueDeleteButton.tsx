import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const IssueDeleteButton = ({issueId} : {issueId : string}) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color='red'>Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Delete Issue</AlertDialog.Title>
            <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
            <Flex mt='4' gap='4'>
                <AlertDialog.Cancel>
                    <Button color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button color='red'>Delete</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default IssueDeleteButton