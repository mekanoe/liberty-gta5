let triggerActive = false
let bankName = "Bank of Liberty"
let allowTrigger = true
let menuOpen = false
let menuClose

API.onResourceStart.connect(() => {
	// openBankMenu()
})

API.onUpdate.connect(() => {
	if (triggerActive && allowTrigger) {
		if (API.isControlPressed(23)) {
			openBankMenu()
		}
	}

	if (menuOpen && API.isControlPressed(177)) {
		menuClose()
	}
})

API.onServerEventTrigger.connect((name, args) => {
	if (args[0] == "bank") {
		switch (name) {
			case 'npcbiz:triggerEnter':
				triggerActive = true
				bankName = args[1]
				break
			case 'npcbiz:triggerExit':
				triggerActive = false
				allowTrigger = true
				break
		}
	}
})

function openBankMenu() {
	menuOpen = true
	allowTrigger = false

	const menu = resource.nativemenu.createMenu(1)
	menu.Blur = true
	resource.nativemenu.currentPage = 1

	let panel;
	let text;
	let input;

	const anchor = {
		x: 23,
		y: 5
	}

	/// HEADER
	panel = menu.createPanel(0, anchor.x, anchor.y, 8, 1)
	panel.MainBackgroundColor(0, 100, 0, 255)
	panel.Header = true
	text = panel.addText(bankName)
	text.Centered = true
	text.VerticalCentered = true
	text.Font = 1
	text.Color(255, 255, 255, 255)


	/// ROW 1 LEFT: Cash
	panel = menu.createPanel(0, anchor.x, anchor.y+1, 4, 1)
	panel.MainBackgroundColor(0, 0, 0, 255)
	text = panel.addText('Cash on Hand')
	text.Font = 0
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)

	/// ROW 1 RIGHT: Cash Amount
	panel = menu.createPanel(0, anchor.x+4, anchor.y+1, 4, 1)
	panel.MainBackgroundColor(0, 0, 0, 255)
	text = panel.addText('$0')
	text.Centered = true
	text.Font = 0
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)


	/// ROW 2 LEFT: BALANCE
	panel = menu.createPanel(0, anchor.x, anchor.y+2, 4, 1)
	panel.MainBackgroundColor(0, 0, 0, 255)
	text = panel.addText('Account Balance')
	text.Font = 0
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)

	/// ROW 2 RIGHT: BALANCE AMT
	panel = menu.createPanel(0, anchor.x+4, anchor.y+2, 4, 1)
	panel.MainBackgroundColor(0, 0, 0, 255)
	text = panel.addText('$0')
	text.Centered = true
	text.Font = 0
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)


	/// ROW 3: XFER
	panel = menu.createPanel(0, anchor.x, anchor.y+3, 8, 1)
	panel.MainBackgroundColor(0, 0, 0, 255)
	text = panel.addText('Transfer Amount')
	text.Font = 0
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)
	let numInput = panel.addInput(4, 0, 4, 1)
	numInput.NumericOnly = true
	numInput.MainBackgroundColor(75, 75, 75, 255)
	numInput.HoverBackgroundColor(100,100,100,255)


	/// ROW 4 LEFT: WITHDRAW
	panel = menu.createPanel(0, anchor.x, anchor.y+4, 4, 1)
	panel.MainBackgroundColor(30, 0, 0, 255)
	panel.HoverBackgroundColor(100, 0, 0, 255)
	panel.Hoverable = true
	panel.Header = true
	text = panel.addText('Withdraw')
	text.Font = 0
	text.Centered = true
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)

	/// ROW 4 RIGHT: DEPOSIT
	panel = menu.createPanel(0, anchor.x+4, anchor.y+4, 4, 1)
	panel.MainBackgroundColor(0, 30, 0, 255)
	panel.HoverBackgroundColor(0, 100, 0, 255)
	panel.Hoverable = true
	panel.Header = true
	text = panel.addText('Deposit')
	text.Font = 0
	text.Centered = true
	text.FontScale = 0.40
	text.Color(255, 255, 255, 255)

	menu.Ready = true
	API.showCursor(true)

	menuClose = () => {
		if (numInput.Selected) {
			return
		}

		menuOpen = false
		menu.Ready = false
		menu.Blur = false
		API.showCursor(false)
		allowTrigger = true
		resource.nativemenu.reset()
	}
}
