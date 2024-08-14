type RouteParams = {
	params: {
		id: string
	}
}

interface SubpageLink {
	link: string
	id: number
	imagesrc: string
	mobileimagesrc: string
}

interface FrontItem {
	id: number
	nou_subpagelink: SubpageLink
}

interface AllData {
	front: FrontItem[]
}

interface MobileData {
	mobileimagesrc: string
	link: string
	title: string
	description: string
	nou_contacts: Contact[]
	mobilefooter: string
}
interface FrontMobilePageProps {
	data: {
		front: FrontItem[]
	}
}

interface Subpage {
	imagesrc: string
	title: string
	description: string
	nou_contacts: Contact[]
	cornertext: string
	mobilefooter: string
	link: string
	mobileimagesrc: string
}

interface SubpageData {
	subpage: Subpage[]
}

interface DesktopViewProps {
	subpageData: SubpageData
	openContactModal: (contact: Contact) => void
}

interface GetInTouchMobilePageProps {
	data: Subpage
	openContactModal: (contact: Contact) => void
}

interface MobileSubPageProps {
	data: MobileData
}

interface SubpageData {
	id: number
	link: string
	linkcolor: string
	navimgsrc: string
	activenavimgsrc: string
}

interface Contact {
	id: number
	imagesrc: string
	name: string
}

interface GetInTouchData {
	subpage: {
		imagesrc: string
		title: string
		description: string
		nou_contacts: {
			id: number
			imagesrc: string
			name: string
		}[]
		cornertext: string
	}[]
}

interface NavItem {
	id: number
	nou_subpagelink: {
		nou_subpage: {
			link: string
			id: number
			activenavimgsrc: string
			navimgsrc: string
		}
	}
}

interface ModalProps {
	contactName: string
	closeModal: () => void
}

interface FormErrors {
	for: string
	message: string
}

type NavProps = React.HTMLAttributes<HTMLDivElement>

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DescriptionWithLineBreaksProps
	extends React.HTMLAttributes<HTMLDivElement> {
	description: string
}
